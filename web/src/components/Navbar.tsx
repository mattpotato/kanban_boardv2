import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link, useHistory } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useLogoutMutation } from "../generated/graphql";

const Navbar: React.FC = () => {
  const [logout] = useLogoutMutation();

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
              update: async (cache, result) => {
                if (result.data?.logout) {
                  await cache.reset();
                  window.location.replace("/login");
                }
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
