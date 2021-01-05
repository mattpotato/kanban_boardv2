import React from "react";
import { Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const LandingLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Flex padding="20px" width="100vw" justifyContent="space-between">
        <ChakraLink as={Link} to="/">
          Kanban
        </ChakraLink>

        <Flex alignSelf="flex-end">
          <ColorModeSwitcher />
          <ChakraLink as={Link} to="/login" textDecoration="none">
            <Button variant="ghost">Login</Button>
          </ChakraLink>
          <ChakraLink as={Link} to="/register" textDecoration="none">
            <Button variant="solid" colorScheme="green">
              Create account
            </Button>
          </ChakraLink>
        </Flex>
      </Flex>
      {children}
    </Flex>
  );
};
export default LandingLayout;
