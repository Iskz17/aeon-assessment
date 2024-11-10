import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "@/components/NavBar";
import { MobileProvider } from "@/context/MobileContext";
import { NavbarProvider } from "@/context/NavbarContext";
import "@testing-library/jest-dom";

jest.mock("next/image", () => {
    const MockedImage = (props) => {
        let { priority, ...rest } = props;
        return <img {...rest} alt={props.alt || ""} />;
    };
    MockedImage.displayName = "MockedImage";
    return MockedImage;
});

const renderWithProviders = (isMobile = false, showNavbar = true) => {
    return render(
        <MobileProvider value={isMobile}>
            <NavbarProvider value={showNavbar}>
                <Navbar />
            </NavbarProvider>
        </MobileProvider>
    );
};

describe("Navbar Component", () => {
    it("renders the Navbar component when `showNavbar` is true", () => {
        renderWithProviders(false, true);
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("does not render the Navbar component when `showNavbar` is false", async () => {
        renderWithProviders(false, false);
        await waitFor(() => {
            expect(screen.queryAllByRole("banner", { id: 'navbar' }).length).toBe(0);
        }, 1000);

    });

    it("displays desktop menu items when not in mobile view", () => {
        renderWithProviders(false, true);
        const menuOptions = ["Login", "Showcase", "Docs", "Blog", "Analytics", "Templates", "Enterprise"];
        menuOptions.forEach((option) => {
            expect(screen.getAllByRole("button", { id: `${option}-desktop-button` })[0]).toBeInTheDocument();
        });
    });

    it("displays hamburger menu and search icon in mobile view", () => {
        renderWithProviders(true, true);
        expect(screen.getAllByRole("button", { id: 'search-mobile-button' }).length).toBeGreaterThan(0);
        expect(screen.getAllByRole("button", { id: 'hamburger-mobile-button' }).length).toBeGreaterThan(0);
    });

    it("opens and closes the drawer in mobile view", async () => {
        renderWithProviders(true, true);
        const menuButton = screen.getAllByRole("button", { id: 'hamburger-mobile-button' })[0];
        await waitFor(() => {
            expect(menuButton).toBeVisible();
            fireEvent.click(menuButton);
        }, 500);
        await waitFor(() => {
            expect(screen.getAllByRole("button", { id: "Login-mobile-menu" })[0]).toBeVisible();
        }, 1000);

        const closeButton = screen.getAllByRole("button", { id: 'close-drawer-button' })[0];
        await waitFor(() => {
            expect(closeButton).toBeVisible();
            fireEvent.click(closeButton);
        }, 500);

        await waitFor(() => {
            expect(screen.getAllByTestId("drawer-menu-mobile")[0].classList.contains('MuiModal-hidden')).toBe(true);
        }, 800);
    });
});
