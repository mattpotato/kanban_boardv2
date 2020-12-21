import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Navbar />
      {children}
    </Flex>
  );
};

export default Layout;
