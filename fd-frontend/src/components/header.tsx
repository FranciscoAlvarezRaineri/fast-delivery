import { AppBar, Box, Toolbar } from "@mui/material";
import Image from "next/image";
import React, { ReactElement } from "react";
import avatar from "../asset/logo.png";
const Header = (): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <Image alt="logo" src={avatar} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
