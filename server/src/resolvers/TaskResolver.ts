import { TaskList } from "./../entities/TaskList";
import { Task } from "./../entities/Task";
import { Board } from "./../entities/Board";
import {
  Arg,
  Float,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class TaskResolver {
  @Mutation(() => Task)
  async createTask(
    @Arg("taskName", () => String) taskName: string,
    @Arg("listId", () => Int) listId: number,
    @Arg("boardId", () => Int) boardId: number,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Task | undefined> {
    let taskList = await TaskList.findOne({ id: listId });
    if (taskList) {
      let task = Task.create({
        listId,
        name: taskName,
        pos: taskList.maxPos + 65535.5,
      });
      task.taskList = taskList;
      let newTask = await task.save();
      taskList.maxPos += 65535.5;
      await taskList.save();
      await pubsub.publish("ACTIVITY", { boardId, message: "Task Created" });
      return newTask;
    }

    return undefined;
  }

  @Mutation(() => Boolean)
  async moveTask(
    @Arg("taskId", () => Int) taskId: number,
    @Arg("toListId", () => Int) toListId: number,
    @Arg("toPos", () => Float) toPos: number,
    @Arg("boardId", () => Int) boardId: number,
    @Arg("lastUpdated", () => String) lastUpdated: string,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Boolean> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    let board = await queryRunner.manager.findOne(Board, boardId);

    if (board) {
      if (new Date(lastUpdated).getTime() === board.updatedAt.getTime()) {
        // get the list
        let list = await queryRunner.manager.findOne(TaskList, toListId, {
          relations: ["tasks"],
        });
        if (list) {
          if (toPos < list.minPos) {
            list.minPos = toPos;
          } else if (toPos > list.maxPos) {
            list.maxPos = toPos;
          }
          if (list.tasks.length === 0) {
            list.minPos = toPos;
            list.maxPos = toPos;
          }
          // update board
          board.updatedAt = new Date();

          // start transaction
          await queryRunner.startTransaction();
          try {
            await queryRunner.manager.save(list);
            await queryRunner.manager
              .createQueryBuilder()
              .update(Task)
              .set({
                pos: toPos,
                listId: toListId,
                taskList: list,
              })
              .where("id = :taskId", { taskId })
              .execute();
            await queryRunner.manager.save(board);
            await queryRunner.commitTransaction();
            await pubsub.publish("ACTIVITY", {
              boardId: board.id,
              message: "Task Moved",
            });
          } catch (err) {
            await queryRunner.rollbackTransaction();
          } finally {
            await queryRunner.release();
          }
          return true;
        }
      }
    }
    await queryRunner.release();

    return false;
  }

  @Mutation(() => Boolean)
  async deleteTask(
    @Arg("id", () => Int) id: number,
    @Arg("listId", () => Int) listId: number,
    @Arg("boardId", () => Int) boardId: number,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Boolean> {
    await Task.delete({
      id,
      listId,
    });
    await pubsub.publish("ACTIVITY", { boardId, message: "Task Deleted" });
    return true;
  }

  @Mutation(() => Task)
  async renameTask(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string
  ) {
    let task = await Task.findOne({ id });
    if (task) {
      task.name = name;
      task = await task.save();
    }

    return task;
  }
}
