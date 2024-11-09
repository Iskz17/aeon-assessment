"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import CryptoJS from "crypto-js";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

const UserLogin = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [secureWord, setSecureWord] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleUsernameSubmit = async () => {
    const response = await fetch("/api/getSecureWord");
    const data = await response.json();
    setSecureWord(data.secureWord);
    setStep(2); // Move to the next step to display the secure word
  };

  const handleNext = () => {
    setStep(3); // Move to password input step
  };

  const handleLogin = async () => {
    // Encrypt password before sending
    const encryptedPassword = CryptoJS.SHA256(password).toString();

    // Submit username and encrypted password to the login API
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, encryptedPassword }),
    });

    const data = await response.json();
    setLoginMessage(data.message);
    setStep(4); // Move to the final confirmation step
    setTimeout(() => { 
      router.push('/transactions'); // Redirect after login success
    }, 600);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login Flow
        </Typography>

        {step === 1 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Step 1: Enter Username</Typography>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUsernameSubmit}
              fullWidth
            >
              Submit Username
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Step 2: Secure Word</Typography>
            <Typography variant="body1">
              Your secure word is: <strong>{secureWord}</strong>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              fullWidth
            >
              Next
            </Button>
          </Box>
        )}

        {step === 3 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Step 3: Enter Password</Typography>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
            >
              Login
            </Button>
          </Box>
        )}

        {step === 4 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Typography variant="h6">{loginMessage}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default UserLogin;
