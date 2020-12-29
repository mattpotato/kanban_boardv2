import { MyContext } from "./../types";
import { Board } from "../entities/Board";
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
} from "type-graphql";

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
  async createBoard(
    @Ctx() { req }: MyContext,
    @Arg("boardName", () => String) boardName: string
  ): Promise<Board> {
    return Board.create({
      name: boardName,
      creatorId: req.session.userId,
    }).save();
  }

  @Query(() => Board)
  async getBoardById(
    @Arg("boardId", () => Int) boardId: number
  ): Promise<Board | undefined> {
    return Board.findOne({
      where: {
        id: boardId,
      },
    });
  }

  @Query(() => [Board])
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
  onNewActivity(
    @Arg("boardId", () => Int) _boardId: number,
    @Root() activity: BoardActivity
  ) {
    return activity;
  }
}
