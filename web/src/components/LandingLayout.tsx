import React from "react";
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Flex padding="20px" width="100vw" justifyContent="space-between">
        <Box>Kanban</Box>

        <Flex alignSelf="flex-end">
          <ChakraLink as={Link} to="/login">
            <Button variant="ghost">Login</Button>
          </ChakraLink>
          <ChakraLink as={Link} to="#">
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
