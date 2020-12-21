import { Board } from "src/entities/Board";
import { MyContext } from "src/types";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class BoardResolver {
  @Query(() => Board)
  async createBoard(
    @Ctx() { req }: MyContext,
    @Arg("boardName") boardName: string
  ): Promise<Board | undefined> {
    return Board.create({
      name: boardName,
      creatorId: req.session.userId,
    }).save();
  }

  @Query(() => [Board])
  async getBoards(@Ctx() { req }: MyContext): Promise<Board[] | undefined> {
    return Board.find({
      where: {
        creatorId: req.session.userId,
      },
    });
  }
}
