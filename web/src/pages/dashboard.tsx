import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
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
      <HStack margin="20px" spacing={4}>
        <Heading as="h2" size="xl">
          Boards
        </Heading>
        <Button
          leftIcon={<BsPlus />}
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
          New Board
        </Button>
      </HStack>
      {data?.getBoards && (
        <Box margin="20px">
          <BoardList boards={data?.getBoards as Board[]} />
        </Box>
      )}
    </Layout>
  );
};

export default Dashboard;
