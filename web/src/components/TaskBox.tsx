import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
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
            role="group"
            position="relative"
            width="300px"
            borderRadius="3px"
            borderColor="rgba(255, 255, 255, 0.1)"
            borderWidth="1px"
            background="rgba(138, 148, 145, 0.1)"
            marginLeft="10px"
            padding="10px"
            _hover={{ borderColor: "black" }}
          >
            {data.name}
            <IconButton
              icon={<BsThreeDots />}
              aria-label="options"
              position="absolute"
              visibility="hidden"
              opacity="0"
              top="2px"
              right="0px"
              _groupHover={{
                visibility: "visible",
                opacity: "1",
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Box>
        </div>
      )}
    </Draggable>
  );
});

export default TaskBox;
