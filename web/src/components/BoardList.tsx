import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Board } from "../generated/graphql";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
interface BoardListProps {
  boards: Board[];
}

export const BoardList: React.FC<BoardListProps> = ({ boards }) => {
  const history = useHistory();
  return (
    <Box>
      <Table variant="striped" colorScheme="green">
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
              key={board.id}
              onClick={() => history.push(`/board/${board.id}`)}
              cursor="pointer"
            >
              <Td>{board.name}</Td>
              <Td>{dayjs(board.createdAt).format("D MMM YYYY")}</Td>
              <Td>{dayjs().to(dayjs(board.updatedAt))}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
