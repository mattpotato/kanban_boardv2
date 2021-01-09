import { Flex, FormControl, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useCreateTaskMutation } from "../generated/graphql";

interface AddTaskButtonProps {
  listId: number;
  boardId: number;
}

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({
  listId,
  boardId,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [createTask] = useCreateTaskMutation();
  const [show, setShow] = useState(false);

  const onSubmit = ({ taskName }: { taskName: string }) => {
    // send data
    if (taskName?.length > 0) {
      try {
        createTask({
          variables: {
            taskName,
            listId,
            boardId,
          },
          // optimisticResponse: {
          //   __typename: "Mutation",
          //   createTask: {
          //     __typename: "Task",
          //     id: 696969,
          //     name: taskName,
          //     listId,
          //     pos: 6969692,
          //   },
          // },

          update: (cache, { data }) => {
            cache.evict({ fieldName: "getBoardById" });
            // let prevTaskList = cache.readFragment({
            //   id: `TaskList:${listId}`,
            //   fragment: gql`
            //     fragment TaskListFragment on TaskList {
            //       id
            //       boardId
            //       createdAt
            //       maxPos
            //       minPos
            //       name
            //       pos
            //       tasks {
            //         id
            //         name
            //         pos
            //       }
            //       updatedAt
            //     }
            //   `,
            // }) as TaskList;
            // cache.writeFragment({
            //   id: `TaskList:${listId}`,
            //   fragment: gql`
            //     fragment TaskListFragment2 on TaskList {
            //       id
            //       tasks {
            //         id
            //         listId
            //         name
            //         pos
            //       }
            //     }
            //   `,
            //   data: [...prevTaskList.tasks, data],
            // });
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    setShow(false);
    reset();
  };

  return (
    <Flex as="form" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        {show ? (
          <Input
            autoFocus={show}
            type="text"
            placeholder="Enter Task Name..."
            name="taskName"
            ref={register}
            onBlur={handleSubmit(onSubmit)}
            width="290px"
            minHeight="50px"
            borderColor="rgb(255, 255, 255)"
            background="rgba(138, 148, 145, 0.1)"
            marginLeft="10px"
            marginRight="30px"
          />
        ) : (
          <Button
            variant="ghost"
            leftIcon={<FaPlus />}
            marginLeft="10px"
            onClick={() => setShow(true)}
          >
            New Task
          </Button>
        )}
      </FormControl>
    </Flex>
  );
};
