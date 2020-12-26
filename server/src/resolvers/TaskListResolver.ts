import { Board } from "../entities/Board";
import { TaskList } from "../entities/TaskList";
import {
  Arg,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";

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

  @Query(() => [TaskList])
  getTaskLists(
    @Arg("boardId", () => Int) boardId: number
  ): Promise<TaskList[]> {
    return TaskList.find({
      where: {
        boardId,
      },
      relations: ["tasks"],
    });
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
