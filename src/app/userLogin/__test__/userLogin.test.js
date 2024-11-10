// __tests__/page.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginFlowModal from '@/app/userLogin/page';
import { useRouter } from 'next/navigation';
import { NavbarProvider } from '@/context/NavbarContext';
import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const mockPush = jest.fn();
useRouter.mockReturnValue({ push: mockPush });

describe('LoginFlowModal Page', () => {

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('renders the Login modal with initial UI', () => {
        render(
            <NavbarProvider>
                <LoginFlowModal />
            </NavbarProvider>
        );
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });

    it('progresses to the next step after entering username', async () => {
        render(
            <NavbarProvider>
                <LoginFlowModal />
            </NavbarProvider>
        );

        fetchMock.mockResponseOnce(JSON.stringify({ secureWord: "testSecureWord" }));
        // Simulate entering a username and submitting
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.click(screen.getByText(/Submit Username/i));

        // Verify next step shows
        await waitFor(() => {
            expect(screen.getByText(/Verify Secure Word/i)).toBeInTheDocument();
        }, 800)
    });

    it('redirects to /transactions after successful login', async () => {
        render(
            <NavbarProvider>
                <LoginFlowModal />
            </NavbarProvider>
        );

        fetchMock.mockResponseOnce(JSON.stringify({ secureWord: "testSecureWord" }));
        // Simulate the steps leading to login completion
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.click(screen.getByText(/Submit Username/i));

        await waitFor(() => {
            fireEvent.click(screen.getByText(/Next/i));
        }, 800)

        fetchMock.mockResponseOnce(JSON.stringify({ message: "Login successful!" }));

        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getAllByRole("button", { id: "login-modal-button" })[0]);

        // Wait for the final step and assert redirection
        expect(await screen.findByText(/Login successful!/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/transactions');
        }, 800)
    });
});
