import { MyContext } from "./../types";
import { Board } from "../entities/Board";
import { isAuth } from "../middleware/isAuth";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

@ObjectType()
export class BoardActivity {
  @Field(() => Int!)
  boardId: number;

  @Field(() => String)
  message: string;
}
@Resolver()
export class BoardResolver {
  @Mutation(() => Board)
  @UseMiddleware(isAuth)
  async createBoard(
    @Ctx() { req }: MyContext,
    @Arg("boardName", () => String) boardName: string
  ): Promise<Board> {
    return Board.create({
      name: boardName,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Board)
  @UseMiddleware(isAuth)
  async changeBoardName(
    @Ctx() { req }: MyContext,
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string
  ) {
    let board = await Board.findOne({
      where: {
        id,
        creatorId: req.session.userId,
      },
    });

    if (board) {
      board.name = name;
      await board.save();
    }

    return board;
  }

  @Query(() => Board)
  @UseMiddleware(isAuth)
  async getBoardById(
    @Arg("boardId", () => Int) boardId: number,
    @Ctx() { req }: MyContext
  ): Promise<Board | undefined> {
    let board = await getConnection()
      .createQueryBuilder()
      .select("board")
      .from(Board, "board")
      .where("board.id = :id", { id: boardId })
      .andWhere("board.creatorId = :creatorId", {
        creatorId: req.session.userId,
      })
      .leftJoinAndSelect("board.taskLists", "taskLists")
      .leftJoinAndSelect("taskLists.tasks", "tasks")
      .addOrderBy("taskLists.pos", "ASC")
      .addOrderBy("tasks.pos", "ASC")
      .getOne();

    return board;
  }

  @Query(() => [Board])
  @UseMiddleware(isAuth)
  async getBoards(@Ctx() { req }: MyContext): Promise<Board[] | undefined> {
    return Board.find({
      where: {
        creatorId: req.session.userId,
      },
    });
  }

  @Subscription(() => BoardActivity, {
    topics: "ACTIVITY",
    filter: ({ args, payload }) => {
      return args.boardId === payload.boardId;
    },
  })
  @UseMiddleware(isAuth)
  onNewActivity(
    @Arg("boardId", () => Int) _boardId: number,
    @Root() activity: BoardActivity
  ) {
    return activity;
  }
}
