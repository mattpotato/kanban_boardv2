import { Button, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BoardList } from "../components/BoardList";
import Layout from "../components/Layout";
import {
  Board,
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "../generated/graphql";

const Dashboard: React.FC = () => {
  const { data } = useGetBoardsQuery();
  const [createBoard] = useCreateBoardMutation();

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
      {data?.getBoards && <BoardList boards={data?.getBoards as Board[]} />}
    </Layout>
  );
};

export default Dashboard;
