import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskList, useDeleteTaskListMutation } from "../generated/graphql";
import { AddTaskButton } from "./AddTaskButton";
import TaskBox from "./TaskBox";

interface ListBoxProps {
  data: TaskList;
  col: number;
}

const ListBox: React.FC<ListBoxProps> = React.memo(({ col, data }) => {
  const [deleteList] = useDeleteTaskListMutation();

  return (
    <Draggable draggableId={"l" + data.id} index={col}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Flex justifyContent="space-between" {...provided.dragHandleProps}>
            <Box margin="10px">{data.name}</Box>
            <Button
              onClick={() => {
                deleteList({
                  variables: {
                    id: data.id,
                  },
                  update: (cache) => {
                    cache.evict({ fieldName: "getTaskLists" });
                  },
                });
              }}
            >
              close
            </Button>
          </Flex>
          <Droppable droppableId={"" + col}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Stack>
                  {data.tasks.map((task, index) => (
                    <TaskBox key={task.id} data={task} index={index} />
                  ))}
                  {provided.placeholder}
                  <AddTaskButton listId={data.id} />
                </Stack>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
});

export default ListBox;
