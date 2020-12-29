import { Flex, FormControl, Button, Stack, Input } from "@chakra-ui/react";
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
    if (taskName.length > 0) {
      try {
        createTask({
          variables: {
            taskName,
            listId,
            boardId,
          },

          update: (cache) => {
            cache.evict({ fieldName: "getTaskLists" });
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
          <Stack>
            <Input
              autoFocus={show}
              type="text"
              placeholder="Enter Task Name..."
              name="taskName"
              ref={register}
              onBlur={handleSubmit(onSubmit)}
              width="300px"
              minHeight="50px"
              borderColor="rgb(255, 255, 255)"
              background="rgba(138, 148, 145, 0.1)"
              marginLeft="10px"
              padding="10px"
            />
          </Stack>
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
