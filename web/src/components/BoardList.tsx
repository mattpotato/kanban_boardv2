import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Board } from "../generated/graphql";
import { useHistory } from "react-router-dom";

interface BoardListProps {
  boards: Board[];
}

export const BoardList: React.FC<BoardListProps> = ({ boards }) => {
  const history = useHistory();
  return (
    <Box>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Board Name</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {boards.map((board) => (
            <Tr
              onClick={() => history.push(`/board/${board.id}`)}
              cursor="pointer"
            >
              <Td>{board.name}</Td>
              <Td>{board.createdAt}</Td>
              <Td>{board.updatedAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};