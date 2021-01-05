import React from "react";
import { Button, Heading, Link as ChakraLink, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LandingLayout from "../components/LandingLayout";

const Home = () => {
  return (
    <LandingLayout>
      <Stack alignItems="center" spacing="40px">
        <Heading as="h1" size="4xl" isTruncated>
          Kanban Board
        </Heading>
        <Heading as="h2" size="2xl">
          Organize your projects and tasks
        </Heading>
        <ChakraLink
          as={Link}
          to="/register"
          _hover={{ textDecoration: "none" }}
        >
          <Button variant="solid" colorScheme="green">
            Get Started
          </Button>
        </ChakraLink>
      </Stack>
    </LandingLayout>
  );
};

export default Home;
