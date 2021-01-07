import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import {
  Task,
  useDeleteTaskMutation,
  useRenameTaskMutation,
} from "../generated/graphql";

interface TaskBoxProps {
  data: Task;
  boardId: number;
  index: number;
}

const MenuActions: React.FC<{
  onDelete: Function;
}> = React.memo(({ onDelete }) => (
  <Menu placement="bottom-end" isLazy>
    <MenuButton
      as={IconButton}
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
    >
      Actions
    </MenuButton>
    <MenuList>
      <MenuItem onClick={() => onDelete()}>Delete</MenuItem>
    </MenuList>
  </Menu>
));

const TaskBox: React.FC<TaskBoxProps> = React.memo(
  ({ data, index, boardId }) => {
    const [deleteTask] = useDeleteTaskMutation();
    const [renameTask] = useRenameTaskMutation();
    const [name, setName] = useState(data.name);

    const onDelete = () => {
      deleteTask({
        variables: {
          id: data.id,
          boardId,
          listId: data.listId,
        },
        update: (cache) => {
          cache.evict({ fieldName: "getBoardById" });
        },
      });
    };
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
              <Editable
                defaultValue={data.name}
                onSubmit={(nextValue) => {
                  if (nextValue) {
                    renameTask({
                      variables: {
                        id: data.id,
                        name: nextValue,
                        boardId,
                      },
                    });
                    setName(nextValue);
                  }
                }}
              >
                {(props) => (
                  <>
                    <Box
                      as={EditablePreview}
                      onClick={props.onEdit}
                      cursor="pointer"
                    >
                      <Text as="b">{name}</Text>
                    </Box>
                    <EditableInput />
                  </>
                )}
              </Editable>
              <MenuActions onDelete={onDelete} />
            </Box>
          </div>
        )}
      </Draggable>
    );
  }
);

export default TaskBox;
