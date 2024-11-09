// components/Navbar.js
"use client"; // This makes the file a Client Component

import React, { useState } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  Drawer,
} from "@mui/material";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2 }}>
          MyApp
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" }, marginRight: 2 }}>
          <TextField placeholder="Search..." variant="outlined" size="small" />
        </Box>
        <Link href="/userLogin" passHref>
          <Button color="inherit">Login</Button>
        </Link>
      </Toolbar>

      {/* Collapsible Drawer for Mobile View */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6">MyApp</Typography>
          <Box sx={{ my: 2 }}>
            <TextField
              placeholder="Search..."
              fullWidth
              variant="outlined"
              size="small"
            />
          </Box>
          <Link href="/userLogin" passHref>
            <Button color="inherit" onClick={toggleDrawer}>
              Login
            </Button>
          </Link>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
