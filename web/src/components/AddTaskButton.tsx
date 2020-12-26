import { Flex, FormControl, Box, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
    reset();
  };

  return (
    <Flex as="form" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Box mt={4}>
          <Input
            autoFocus={show}
            type="text"
            placeholder="Enter Task Name..."
            name="taskName"
            ref={register}
          />
          <Button type="submit" mt={4} variant="solid" colorScheme="green">
            Add Task
          </Button>
        </Box>
      </FormControl>
    </Flex>
  );
};
