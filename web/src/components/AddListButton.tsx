import { Flex, FormControl, Box, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTaskListMutation } from "../generated/graphql";

interface AddListButtonProps {
  boardId: number;
}

export const AddListButton: React.FC<AddListButtonProps> = ({ boardId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [createList] = useCreateTaskListMutation();
  const [show, setShow] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    // send data
    createList({
      variables: {
        boardId,
        name: data.name,
      },
    });
    reset();
  };

  return (
    <Flex as="form" flexDirection="column" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Box mt={4}>
          <Input
            autoFocus={show}
            type="text"
            placeholder="Enter List Name..."
            name="listName"
            ref={register}
          />
          <Button mt={4} type="submit">
            Add List
          </Button>
        </Box>
      </FormControl>
    </Flex>
  );
};
