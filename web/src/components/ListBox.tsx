import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskList } from "../generated/graphql";

interface ListBoxProps {
  data: TaskList;
  col: number;
}

const ListBox: React.FC<ListBoxProps> = ({ col, data }) => {
  return (
    <Draggable draggableId={"l" + col} index={col}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Box margin="10px" {...provided.dragHandleProps}>
            {data.name}
          </Box>
          <Box
            width="300px"
            borderRadius="3px"
            borderColor="rgb(255, 255, 255)"
            background="rgba(138, 148, 145, 0.1)"
            margin="10px"
            padding="10px"
          >
            task
          </Box>
          <Box
            width="300px"
            borderRadius="3px"
            borderColor="rgb(255, 255, 255)"
            background="rgba(138, 148, 145, 0.1)"
            margin="10px"
            padding="10px"
          >
            task
          </Box>
          <Button variant="ghost" colorScheme="green">
            Add Task
          </Button>
        </div>
      )}
    </Draggable>
  );
};

export default ListBox;
