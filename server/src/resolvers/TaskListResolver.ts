import { Board } from "../entities/Board";
import { TaskList } from "../entities/TaskList";
import { isAuth } from "../middleware/isAuth";
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
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class TaskListResolver {
  @Mutation(() => TaskList)
  @UseMiddleware(isAuth)
  async createTaskList(
    @Arg("name") name: string,
    @Arg("boardId", () => Int) boardId: number,
    @PubSub() pubsub: PubSubEngine
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
      board.updatedAt = new Date();
      await taskList.save();
      await board.save();
    }
    if (taskList) {
      console.log("HELLO");
      await pubsub.publish("TASKLIST", taskList);
      await pubsub.publish("ACTIVITY", {
        boardId: board?.id,
        message: "Task List Created",
      });
      console.log("DATE: " + board?.updatedAt);
      console.log("PUBLISHED");
    }

    return taskList;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTaskList(
    @Arg("id", () => Int) id: number,
    @Arg("boardId", () => Int) boardId: number,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Boolean> {
    let board = await Board.findOne(boardId);
    if (board) {
      await TaskList.delete({ id, boardId });
      board.updatedAt = new Date();
      await board.save();
      pubsub.publish("ACTIVITY", { boardId, message: "Task List Deleted" });
    }
    return true;
  }

  @Mutation(() => TaskList)
  @UseMiddleware(isAuth)
  async renameTaskList(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string,
    @Arg("boardId", () => Int) boardId: number,
    @PubSub() pubsub: PubSubEngine
  ) {
    let board = await Board.findOne(boardId);
    let taskList = await TaskList.findOne({ id });
    if (board) {
      if (taskList) {
        const oldName = taskList.name;
        taskList.name = name;
        taskList = await taskList.save();
        board.updatedAt = new Date();
        await board.save();
        pubsub.publish("ACTIVITY", {
          boardId,
          message: `Task List '${oldName}' renamed to '${name}'`,
        });
      }
    }

    return taskList;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async moveTaskList(
    @Arg("id", () => Int) id: number,
    @Arg("toPos", () => Float) toPos: number,
    @Arg("boardId", () => Int) boardId: number,
    @Arg("lastUpdated") lastUpdated: string,
    @PubSub() pubsub: PubSubEngine
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
          await pubsub.publish("ACTIVITY", {
            boardId: board.id,
            message: "Moved Task List",
          });
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
  @UseMiddleware(isAuth)
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
      return args._boardId === payload.boardId;
    },
  })
  @UseMiddleware(isAuth)
  onNewTaskList(
    @Arg("boardId", () => Int) _boardId: number,
    @Root() newTaskList: TaskList
  ) {
    return newTaskList;
  }
}
