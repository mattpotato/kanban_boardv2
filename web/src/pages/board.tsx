import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { AddListButton } from "../components/AddListButton";
import Layout from "../components/Layout";
import ListBox from "../components/ListBox";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import {
  TaskList,
  useChangeBoardNameMutation,
  useDeleteBoardMutation,
  useGetBoardByIdQuery,
  useMoveTaskListMutation,
  useMoveTaskMutation,
  useOnNewActivitySubscription,
} from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { BsPlus, BsThreeDots } from "react-icons/bs";

interface BoardRouteInfo {
  boardId: string;
}

const Board: React.FC<RouteComponentProps<BoardRouteInfo>> = (props) => {
  const history = useHistory();
  const client = useApolloClient();
  const [lists, setLists] = useState<TaskList[] | []>([]);
  const [changeBoardName] = useChangeBoardNameMutation();
  const [moveList] = useMoveTaskListMutation({
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    },
  });
  const [moveTask] = useMoveTaskMutation({
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    },
  });
  const [deleteBoard] = useDeleteBoardMutation();

  const { data, loading } = useGetBoardByIdQuery({
    variables: {
      boardId: parseInt(props.match.params.boardId),
    },
    onError: (error) => {
      if (error) {
        history.push("/dashboard");
      }
    },
  });

  const { data: activityData } = useOnNewActivitySubscription({
    variables: {
      boardId: parseInt(props.match.params.boardId),
    },
  });

  const onDragEnd = async ({ source, destination, type }: DropResult) => {
    if (!destination) return;
    //if we're dragging a list
    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        const newLists = Array.from(lists);

        let newPos = 0;
        if (destination.index === 0) {
          newPos = newLists[destination.index].pos / 2;
        } else if (destination.index === newLists.length - 1) {
          newPos = newLists[destination.index].pos + 65535;
        } else {
          if (source.index < destination.index) {
            let firstPos = newLists[destination.index].pos;
            let secondPos = newLists[destination.index + 1].pos;
            newPos = (firstPos + secondPos) / 2;
          } else {
            // this works correctly if from below
            let firstPos = newLists[destination.index - 1].pos;
            let secondPos = newLists[destination.index].pos;
            newPos = (firstPos + secondPos) / 2;
          }
        }
        const [removedList] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, removedList);
        setLists(newLists);
        console.log({
          id: lists[source.index].id,
          toPos: newPos,
          boardId: parseInt(props.match.params.boardId),
          lastUpdated: data!.getBoardById.updatedAt,
        });
        await moveList({
          variables: {
            id: lists[source.index].id,
            toPos: newPos,
            boardId: parseInt(props.match.params.boardId),
            lastUpdated: data!.getBoardById.updatedAt,
          },

          update: (cache) => {
            cache.evict({ fieldName: "getBoardById" });
          },
        });
      }

      return;
    }

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = lists[parseInt(source.droppableId)];
    const end = lists[parseInt(destination.droppableId)];
    console.log({ start, end });
    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.tasks.filter(
        (_: any, idx: number) => idx !== source.index
      );

      let d = destination.index;
      let newPos = 0;
      if (d === 0) {
        let topPos = start.tasks[destination.index].pos;
        newPos = topPos / 2;
      } else if (
        d ===
        lists[parseInt(destination.droppableId)].tasks.length - 1
      ) {
        // BOTTOM POS
        let bottomPos = start.tasks[d].pos;
        newPos = bottomPos + 65535;
      } else {
        // doing the middle
        if (source.index < destination.index) {
          let firstPos = start.tasks[destination.index].pos;
          let secondPos = start.tasks[destination.index + 1].pos;
          newPos = (firstPos + secondPos) / 2;
        } else {
          // this works correctly if from below
          let firstPos = start.tasks[destination.index - 1].pos;
          let secondPos = start.tasks[destination.index].pos;
          newPos = (firstPos + secondPos) / 2;
        }
      }

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.tasks[source.index]);

      const listsCopy = [...lists];
      let newLists = listsCopy.map((list, index) => {
        if (index === parseInt(source.droppableId)) {
          return {
            ...list,
            tasks: newList,
          };
        }
        return list;
      });

      setLists(newLists);
      console.log(start.tasks[source.index]);
      console.log({
        taskId: start.tasks[source.index].id,
        toListId: start.tasks[source.index].listId,
        toPos: newPos,
        boardId: data!.getBoardById.id,
        lastUpdated: data!.getBoardById.updatedAt,
      });
      await moveTask({
        variables: {
          taskId: start.tasks[source.index].id,
          toListId: start.tasks[source.index].listId,
          toPos: newPos,
          boardId: data!.getBoardById.id,
          lastUpdated: data!.getBoardById.updatedAt,
        },
        update: (cache) => {
          cache.evict({ fieldName: "getBoardById" });
        },
      });

      // moveTask
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.tasks.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      let newEndList = end.tasks;

      let newPos = 0;
      // Insert the item into the end list
      if (newEndList.length > 0) {
        // check if destination is 0
        if (destination.index === 0) {
          let topPos = newEndList[destination.index].pos;
          newPos = topPos / 2;
        } else if (destination.index === newEndList.length) {
          let botPos = newEndList[destination.index - 1].pos;
          newPos = botPos + 65535;
        } else {
          let firstPos = newEndList[destination.index - 1].pos;
          let secondPos = newEndList[destination.index].pos;
          newPos = (firstPos + secondPos) / 2;
        }
        newEndList = [
          ...newEndList.slice(0, destination.index),
          start.tasks[source.index],
          ...newEndList.slice(destination.index),
        ];
      } else {
        newPos = 65535;
        newEndList = [start.tasks[source.index]];
      }

      const listsCopy = [...lists];
      let newLists = listsCopy.map((list, index) => {
        if (index === parseInt(source.droppableId)) {
          return {
            ...list,
            tasks: newStartList,
          };
        } else if (index === parseInt(destination.droppableId)) {
          return {
            ...list,
            tasks: newEndList,
          };
        }
        return list;
      });

      setLists(newLists);
      moveTask({
        variables: {
          taskId: start.tasks[source.index].id,
          toListId: end.id,
          toPos: newPos,
          boardId: data!.getBoardById.id,
          lastUpdated: data!.getBoardById.updatedAt,
        },
        update: (cache) => {
          cache.evict({ fieldName: "getBoardById" });
          // cache.writeFragment({
          //   id: "TaskList:" + start.id,
          //   fragment: gql`
          //     fragment TaskFragment on TaskList {
          //       id
          //       tasks {
          //         id
          //         listId
          //         name
          //         pos
          //       }
          //     }
          //   `,
          //   data: {
          //     tasks: newStartList,
          //   },
          // });
          // cache.writeFragment({
          //   id: "TaskList:" + end.id,
          //   fragment: gql`
          //     fragment TaskFragment on TaskList {
          //       id
          //       tasks {
          //         id
          //         listId
          //         name
          //         pos
          //       }
          //     }
          //   `,
          //   data: {
          //     tasks: newEndList,
          //   },
          // });
        },
      });
    }
    return null;
  };

  useEffect(() => {
    if (activityData?.onNewActivity) {
      client.cache.evict({ fieldName: "getBoardById" });
    }
  }, [activityData, client]);

  useEffect(() => {
    if (data?.getBoardById.taskLists) {
      setLists(data.getBoardById.taskLists as any);
      document.title = data.getBoardById.name;
    }
  }, [data]);

  return (
    <Layout>
      <Flex>
        {data?.getBoardById ? (
          <Editable
            margin="20px"
            fontSize="4xl"
            defaultValue={data.getBoardById.name}
            startWithEditView={data.getBoardById.name === "Untitled Board"}
            onSubmit={(nextValue) => {
              if (nextValue) {
                changeBoardName({
                  variables: {
                    id: data.getBoardById.id,
                    name: nextValue,
                  },
                });
              }
            }}
          >
            <EditablePreview cursor="pointer" />
            <EditableInput
              placeholder="Enter Board Name"
              autoFocus={true}
              onFocus={(e) => e.target.select()}
            />
          </Editable>
        ) : (
          <Skeleton margin="20px" width="300px">
            <Text fontSize="4xl">Loading...</Text>
          </Skeleton>
        )}
        <Tooltip
          label="Feature coming soon!"
          fontSize="md"
          closeOnClick={false}
        >
          <Button
            marginLeft="10px"
            marginTop="30px"
            leftIcon={<BsPlus />}
            colorScheme="green"
          >
            Invite Members
          </Button>
        </Tooltip>
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            variant="ghost"
            aria-label="Options"
            fontSize="20px"
            margin="30px"
            icon={<BsThreeDots />}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                if (data?.getBoardById) {
                  deleteBoard({
                    variables: {
                      id: data.getBoardById.id,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "getBoards" });
                      history.push("/dashboard");
                    },
                  });
                }
              }}
            >
              Delete Board
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <Flex
              height="100%"
              overflowX="auto"
              overflowY="hidden"
              ref={provided.innerRef}
            >
              {(lists as []).map((list: TaskList, index) => (
                <ListBox key={list.id} col={index} data={list} />
              ))}
              {provided.placeholder}
              {data?.getBoardById ? (
                <AddListButton boardId={data.getBoardById.id} />
              ) : null}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </Layout>
  );
};

export default Board;
