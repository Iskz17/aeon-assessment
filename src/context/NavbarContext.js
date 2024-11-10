"use client";
import React, { createContext, useState, useContext } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ value = null, mockSetShowNavbar = null, children }) => {
    const [showNavbar, setShowNavbar] = useState(value ?? true);

    return (
        <NavbarContext.Provider value={{ showNavbar, setShowNavbar: mockSetShowNavbar ?? setShowNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => useContext(NavbarContext);
