import { Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { useMeQuery } from "../generated/graphql";

const Home = () => {
  const { data } = useMeQuery();
  return (
    <div>
      Home
      <div>Home</div>
      <div>Home</div>
      <ColorModeSwitcher />
      <ChakraLink as={Link} to="/login">
        hello {data?.me?.email}
      </ChakraLink>
      <ChakraLink as={Link} to="/dashboard">
        Dashboard
      </ChakraLink>
    </div>
  );
};

export default Home;
