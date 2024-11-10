"use client";

import React, { createContext, useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const MobileContext = createContext();

export const MobileProvider = ({ value = null, children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <MobileContext.Provider value={value ?? isMobile}>
            {children}
        </MobileContext.Provider>
    );
};

export const useMobile = () => useContext(MobileContext);
