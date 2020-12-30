import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link, useHistory } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

const Navbar: React.FC = () => {
  const [logout] = useLogoutMutation();
  const history = useHistory();
  const client = useApolloClient();
  return (
    <Flex padding="20px" justifyContent="space-between">
      <ChakraLink as={Link} to="/dashboard">
        Kanban
      </ChakraLink>
      <Flex>
        <ColorModeSwitcher />
        <Button
          variant="ghost"
          onClick={() =>
            logout({
              update: (_cache, result) => {
                if (result.data?.logout) {
                  history.push("/login");
                }
                client.resetStore();
              },
            })
          }
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
