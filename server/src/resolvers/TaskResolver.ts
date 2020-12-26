import { TaskList } from "./../entities/TaskList";
import { Task } from "./../entities/Task";
import { Arg, Int, Mutation, Resolver } from "type-graphql";

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
