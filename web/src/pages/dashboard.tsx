import { Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BoardList } from "../components/BoardList";
import Layout from "../components/Layout";
import {
  Board,
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "../generated/graphql";

const Dashboard: React.FC = () => {
  const { data } = useGetBoardsQuery();
  const [boards, setBoards] = useState<Board[]>([]);
  const [createBoard] = useCreateBoardMutation();

  useEffect(() => {
    if (data?.getBoards) {
      setBoards(data.getBoards as Board[]);
    }
  }, [data]);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <Layout>
      <Heading as="h2" size="xl">
        Boards
      </Heading>
      <Button
        variant="solid"
        colorScheme="green"
        onClick={() =>
          createBoard({
            variables: {
              boardName: "Untitled Board",
            },
            update: (cache) => {
              cache.evict({ fieldName: "getBoards" });
            },
          })
        }
      >
        Create New
      </Button>
      <BoardList boards={boards} />
    </Layout>
  );
};

export default Dashboard;
