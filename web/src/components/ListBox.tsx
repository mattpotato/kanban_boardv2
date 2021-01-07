import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Badge,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  Task,
  TaskList,
  useDeleteTaskListMutation,
  useRenameTaskListMutation,
} from "../generated/graphql";
import { AddTaskButton } from "./AddTaskButton";
import TaskBox from "./TaskBox";
import { BsThreeDots } from "react-icons/bs";
interface ListBoxProps {
  data: TaskList;
  col: number;
}

interface InnerListProps {
  tasks: Task[];
  boardId: number;
}

const InnerList: React.FC<InnerListProps> = React.memo(({ tasks, boardId }) => (
  <>
    {tasks.map((task, index) => (
      <TaskBox key={task.id} data={task} index={index} boardId={boardId} />
    ))}
  </>
));

const ListBox: React.FC<ListBoxProps> = React.memo(({ col, data }) => {
  const [deleteList] = useDeleteTaskListMutation();
  const [renameList] = useRenameTaskListMutation();
  const [name, setName] = useState(data.name);

  return (
    <Draggable draggableId={"l" + data.id} index={col}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Flex
            justifyContent="space-between"
            marginBottom="10px"
            {...provided.dragHandleProps}
          >
            <Box marginTop="10px" marginLeft="50px">
              <HStack>
                <Editable
                  defaultValue={name}
                  onSubmit={(nextValue) => {
                    if (nextValue) {
                      renameList({
                        variables: {
                          id: data.id,
                          name: nextValue,
                          boardId: data.boardId,
                        },
                      });
                      setName(nextValue);
                    }
                  }}
                >
                  {(props) => (
                    <>
                      <Badge
                        as={EditablePreview}
                        variant="solid"
                        textTransform="none"
                        maxWidth="200px"
                        cursor="pointer"
                        onClick={props.onEdit}
                      >
                        <Text>{name}</Text>
                      </Badge>
                      <EditableInput placeholder="Enter Board Name" />
                    </>
                  )}
                </Editable>
                <Text>{data.tasks.length}</Text>
              </HStack>
            </Box>
            <Menu placement="bottom-end">
              <MenuButton
                as={IconButton}
                variant="ghost"
                aria-label="Options"
                fontSize="20px"
                marginRight="20px"
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
                        boardId: data.boardId,
                      },
                      update: (cache) => {
                        cache.evict({ fieldName: "getBoardById" });
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
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  maxHeight: "70%",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <Stack width="300px" marginX="30px">
                  <InnerList tasks={data.tasks} boardId={data.boardId} />
                  {provided.placeholder}
                </Stack>
              </div>
            )}
          </Droppable>
          <Box marginLeft="20px">
            <AddTaskButton listId={data.id} boardId={data.boardId} />
          </Box>
        </div>
      )}
    </Draggable>
  );
});

export default ListBox;
