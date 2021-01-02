import { Flex, FormControl, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTaskListMutation } from "../generated/graphql";
import { FaPlus } from "react-icons/fa";
interface AddListButtonProps {
  boardId: number;
}

export const AddListButton: React.FC<AddListButtonProps> = ({ boardId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [createList] = useCreateTaskListMutation();
  const [show, setShow] = useState(false);

  const onSubmit = ({ listName }: { listName: string }) => {
    if (listName.length > 0) {
      try {
        createList({
          variables: {
            boardId,
            name: listName,
          },

          update: (cache) => {
            cache.evict({ fieldName: "getBoardById" });
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
      <FormControl ml="10px">
        {show ? (
          <Input
            autoFocus={show}
            type="text"
            placeholder="Enter List Name..."
            name="listName"
            onBlur={handleSubmit(onSubmit)}
            ref={register}
            minWidth="300px"
          />
        ) : (
          <Button
            variant="ghost"
            leftIcon={<FaPlus />}
            onClick={() => setShow(true)}
          >
            New List
          </Button>
        )}
      </FormControl>
    </Flex>
  );
};
