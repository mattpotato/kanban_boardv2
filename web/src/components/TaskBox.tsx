import { Box } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../generated/graphql";

interface TaskBoxProps {
  data: Task;
  index: number;
}

const TaskBox: React.FC<TaskBoxProps> = React.memo(({ data, index }) => {
  return (
    <Draggable draggableId={"t" + data.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            width="300px"
            borderRadius="3px"
            borderColor="rgb(255, 255, 255)"
            background="rgba(138, 148, 145, 0.1)"
            marginLeft="10px"
            padding="10px"
          >
            {data.name}
          </Box>
        </div>
      )}
    </Draggable>
  );
});

export default TaskBox;
