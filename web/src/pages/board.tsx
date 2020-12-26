import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { AddListButton } from "../components/AddListButton";
import Layout from "../components/Layout";
import ListBox from "../components/ListBox";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import {
  TaskList,
  useGetBoardByIdQuery,
  useGetTaskListsQuery,
  useOnNewTaskListSubscription,
} from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface BoardRouteInfo {
  boardId: string;
}

const Board: React.FC<RouteComponentProps<BoardRouteInfo>> = (props) => {
  const history = useHistory();
  const client = useApolloClient();

  const { data } = useGetBoardByIdQuery({
    variables: {
      boardId: parseInt(props.match.params.boardId),
    },
    onError: (error) => {
      if (error) {
        history.push("/dashboard");
      }
    },
  });

  const { data: listsData } = useGetTaskListsQuery({
    variables: {
      boardId: parseInt(props.match.params.boardId),
    },
  });

  const { data: subData } = useOnNewTaskListSubscription({
    variables: {
      boardId: parseInt(props.match.params.boardId),
    },
  });

  const onDragEnd = ({ source, destination, type }: DropResult) => {};

  useEffect(() => {
    if (subData?.onNewTaskList) {
      client.cache.evict({ fieldName: "getTaskLists" });
    }
  }, [subData, client]);

  return (
    <Layout>
      <Box>Board</Box>
      {subData?.onNewTaskList ? <Box>{subData.onNewTaskList.name}</Box> : null}
      {data?.getBoardById.name ? <Box>{data.getBoardById.name}</Box> : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <Flex ref={provided.innerRef}>
              {listsData?.getTaskLists.map((list, index) => (
                <ListBox key={list.id} col={index} data={list as TaskList} />
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
        {data?.getBoardById ? (
          <AddListButton boardId={data.getBoardById.id} />
        ) : null}
      </DragDropContext>
    </Layout>
  );
};

export default Board;
