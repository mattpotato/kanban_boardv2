import { Flex, FormControl, Button, Stack, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useCreateTaskMutation } from "../generated/graphql";

interface AddTaskButtonProps {
  listId: number;
}

export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ listId }) => {
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
            <Textarea
              autoFocus={show}
              type="text"
              placeholder="Enter Task Name..."
              name="taskName"
              ref={register}
              onBlur={handleSubmit(onSubmit)}
              width="300px"
              minHeight="50px"
              resize="none"
              borderColor="rgb(255, 255, 255)"
              background="rgba(138, 148, 145, 0.1)"
              marginLeft="10px"
              padding="10px"
            />
            <Button
              marginLeft="10px"
              type="submit"
              mt={4}
              variant="solid"
              colorScheme="green"
            >
              Add Task
            </Button>
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
