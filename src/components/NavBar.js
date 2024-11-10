"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  Drawer,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useMobile } from "@/context/MobileContext";
import { useNavbar } from "@/context/NavbarContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const isMobile = useMobile();
  const { showNavbar } = useNavbar();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const consecutiveMarginValue = 1;
  const navbarOptions = ["Login", "Showcase", "Docs", "Blog", "Analytics", "Templates", "Enterprise"];

  const toggleDrawer = (val) => {
    setDrawerOpen(val);
  };

  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  const renderDesktopMenu = () => (
    <Stack direction="row" alignItems="center" sx={{ flexGrow: 1, display: isMobile ? 'none' : 'flex' }}>
      <Image src="/aeon-logo.png" alt="Next.js logo" width={160} height={50} priority />
      {navbarOptions.map((text, index) => (
        <Typography key={text} color="black" sx={{ marginLeft: index === 0 ? 5 : consecutiveMarginValue, flexGrow: text === "Enterprise" ? 1 : 0 }}>
          <Link href="/userLogin" passHref>
            <Button id={`${text}-desktop-button`} color="inherit">{text}</Button>
          </Link>
        </Typography>
      ))}
      <Box sx={{ display: { xs: "none", sm: "block" }, marginRight: 2 }}>
        <TextField placeholder="Search..." variant="outlined" size="small" />
      </Box>
    </Stack>
  );

  const renderMobileMenu = () => (
    <>
      <Stack direction="row" alignItems="center" sx={{ flexGrow: 1, padding: '7px' }}>
        <Image src="/aeon-logo.png" alt="Next.js logo" width={140} height={50} priority />
      </Stack>
      <IconButton id="search-mobile-button" edge="start" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton id="hamburger-mobile-button" edge="start" color="primary" onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
    </>
  );

  const renderDrawer = () => (
    <Drawer
      data-testid="drawer-menu-mobile"
      anchor="top"
      open={drawerOpen && isMobile}
      onClose={() => toggleDrawer(false)}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: "100vw",
          height: "100vh",
          backgroundColor: "background.default",
        },
      }}
      variant="temporary"
    >
      <Box onClick={() => toggleDrawer(false)} sx={{ textAlign: "left", padding: 2 }}>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ flexGrow: 1 }}>
            <Image src="/aeon-logo.png" alt="Next.js logo" width={160} height={50} priority />
          </Typography>
          <IconButton id="search-drawer-button" edge="start" color="primary" onClick={() => toggleDrawer(false)}>
            <SearchIcon />
          </IconButton>
          <IconButton id="close-drawer-button" edge="start" color="primary" onClick={() => toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <List>
          {navbarOptions.map((text) => (
            <ListItem role="button" id={`${text}-mobile-menu`} key={text}>
              <Link href="/userLogin">
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (showNavbar ?
    <AppBar id="navbar" role="banner" position="fixed" style={{ backgroundColor: "whitesmoke" }}>
      <Toolbar>
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </Toolbar>
      {renderDrawer()}
    </AppBar> : <></>
  );
};

export default Navbar;
