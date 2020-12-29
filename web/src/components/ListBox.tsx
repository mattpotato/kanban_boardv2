import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskList, useDeleteTaskListMutation } from "../generated/graphql";
import { AddTaskButton } from "./AddTaskButton";
import TaskBox from "./TaskBox";
import { BsThreeDots } from "react-icons/bs";
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
            <Box marginTop="10px" marginLeft="25px">
              {data.name}
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                variant="ghost"
                aria-label="Options"
                fontSize="20px"
                icon={<BsThreeDots />}
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem
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
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Droppable droppableId={"" + col}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Stack width="300px" margin="10px">
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
