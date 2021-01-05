import React, { useEffect } from "react";
import { Button, Heading, Link as ChakraLink, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LandingLayout from "../components/LandingLayout";

const Home = () => {
  useEffect(() => {
    document.title = "Kanban";
  }, []);

  return (
    <LandingLayout>
      <Stack alignItems="center" spacing="40px">
        <Heading as="h1" size="4xl" isTruncated>
          Kanban Board
        </Heading>
        <Heading as="h2" size="2xl">
          Organize your projects and tasks
        </Heading>
        <ChakraLink as={Link} to="/register">
          <Button variant="solid" colorScheme="green">
            Get Started
          </Button>
        </ChakraLink>
      </Stack>
    </LandingLayout>
  );
};

export default Home;
