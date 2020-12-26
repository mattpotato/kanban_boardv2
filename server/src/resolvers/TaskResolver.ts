import { TaskList } from "./../entities/TaskList";
import { Task } from "./../entities/Task";
import { Board } from "./../entities/Board";
import { Arg, Float, Int, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class TaskResolver {
  @Mutation(() => Task)
  async createTask(
    @Arg("taskName", () => String) taskName: string,
    @Arg("listId", () => Int) listId: number
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
      taskList.save();
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
    @Arg("lastUpdated", () => String) lastUpdated: string
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
            let result = await queryRunner.manager
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
            console.log(result);

            await queryRunner.commitTransaction();
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
    @Arg("listId", () => Int) listId: number
  ): Promise<Boolean> {
    await Task.delete({
      id,
      listId,
    });

    return true;
  }
}
