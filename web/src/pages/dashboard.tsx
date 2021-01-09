import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { BoardList } from "../components/BoardList";
import Layout from "../components/Layout";
import {
  Board,
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "../generated/graphql";

const Dashboard: React.FC = () => {
  const { data } = useGetBoardsQuery();
  const history = useHistory();
  const [createBoard] = useCreateBoardMutation({
    onError: (_error) => {
      history.push("/login");
    },
  });

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
      <Box margin="20px">
        {data?.getBoards && data.getBoards.length > 0 ? (
          <BoardList boards={data.getBoards as Board[]} />
        ) : (
          <Text>You have no boards yet. Click New Board to get started.</Text>
        )}
      </Box>
    </Layout>
  );
};

export default Dashboard;
