import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BoardList } from "../components/BoardList";
import Layout from "../components/Layout";
import { Board, useGetBoardsQuery } from "../generated/graphql";

const Dashboard: React.FC = () => {
  const { data } = useGetBoardsQuery();
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    if (data?.getBoards) {
      setBoards(data.getBoards as Board[]);
    }
  }, [data]);
  return (
    <Layout>
      <Heading as="h2" size="xl">
        Boards
      </Heading>

      <BoardList boards={boards} />

      <Box>Create a board</Box>
    </Layout>
  );
};

export default Dashboard;
