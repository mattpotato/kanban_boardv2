import { Box } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Navbar: React.FC = () => {
  return (
    <Box>
      Kanban
      <ColorModeSwitcher />
    </Box>
  );
};

export default Navbar;
