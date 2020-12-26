import { Board } from "../entities/Board";
import { TaskList } from "../entities/TaskList";
import {
  Arg,
  Float,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class TaskListResolver {
  @Mutation(() => TaskList)
  async createTaskList(
    @Arg("name") name: string,
    @Arg("boardId", () => Int) boardId: number,
    @PubSub() publish: PubSubEngine
  ): Promise<TaskList | undefined> {
    // check if boardId exists
    let board = await Board.findOne({
      where: {
        id: boardId,
      },
    });

    let taskList: TaskList | undefined;

    if (board) {
      taskList = TaskList.create({
        name,
        boardId,
      });
      taskList.board = board;
      taskList.board = board;
      taskList.pos = board.maxPos + 65535;
      taskList.tasks = [];
      board.maxPos = taskList.pos;
      await taskList.save();
      await board.save();
    }
    if (taskList) {
      await publish.publish("TASKLIST", taskList);
      console.log("PUBLISHED");
    }

    return taskList;
  }

  @Mutation(() => Boolean)
  async deleteTaskList(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await TaskList.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  async moveTaskList(
    @Arg("id", () => Int) id: number,
    @Arg("toPos", () => Float) toPos: number,
    @Arg("boardId", () => Int) boardId: number,
    @Arg("lastUpdated") lastUpdated: string
  ): Promise<Boolean> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    // find the board
    let board = await queryRunner.manager.findOne(Board, boardId);
    if (board) {
      // compare the updated values
      if (new Date(lastUpdated).getTime() === board.updatedAt.getTime()) {
        // to the top
        if (toPos < board.minPos) {
          board.minPos = toPos;
        } else if (toPos > board.maxPos) {
          board.maxPos = toPos;
        }
        // start transaction
        await queryRunner.startTransaction();
        try {
          // update the list position
          await queryRunner.manager
            .createQueryBuilder()
            .update(TaskList)
            .set({
              pos: toPos,
            })
            .where({ id })
            .execute();
          // update board
          await queryRunner.manager.save(board);
          await queryRunner.commitTransaction();
        } catch (err) {
          queryRunner.rollbackTransaction();
        } finally {
          queryRunner.release();
        }
        return true;
      }
    }
    return false;
  }

  @Query(() => [TaskList])
  async getTaskLists(
    @Arg("boardId", () => Int) boardId: number
  ): Promise<TaskList[]> {
    let taskLists = await getConnection()
      .createQueryBuilder()
      .select("taskList")
      .from(TaskList, "taskList")
      .where("taskList.boardId = :id", { id: boardId })
      .leftJoinAndSelect("taskList.tasks", "tasks")
      .addOrderBy("taskList.pos", "ASC")
      .addOrderBy("tasks.pos", "ASC")
      .getMany();

    return taskLists;
  }

  @Subscription(() => TaskList, {
    topics: "TASKLIST",
    filter: ({ args, payload }) => {
      return args.boardId === payload.boardId;
    },
  })
  onNewTaskList(
    @Arg("boardId", () => Int) boardId: number,
    @Root() newTaskList: TaskList
  ) {
    return newTaskList;
  }
}
