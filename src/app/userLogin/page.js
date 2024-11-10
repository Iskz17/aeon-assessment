"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useNavbar } from "@/context/NavbarContext";
import Image from "next/image";
import CryptoJS from "crypto-js";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const LoginFlowModal = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureWord, setSecureWord] = useState("");
  const [loginMessage, setLoginMessage] = useState("Login successful!");
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const { setShowNavbar } = useNavbar();

  const handleUsernameSubmit = async () => {
    const response = await fetch("/api/getSecureWord");
    const data = await response.json();
    setSecureWord(data.secureWord);
    setStep(2);
  };

  const handleNext = () => {
    setStep(3);
  };

  const handleLogin = async () => {
    const encryptedPassword = CryptoJS.SHA256(password).toString();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, encryptedPassword }),
    });

    const data = await response.json();
    setLoginMessage(data.message);
    setStep(4);
    setTimeout(() => {
      setShowNavbar(false);
      router.push('/transactions');
    }, 600);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setShowNavbar(true);
      router.push('/');
    }, 10);
  };

  return (
    <>
      <Image
        src="/ShareLah.png"
        alt="ShareLah"
        layout="fill"
        objectFit="cover"
        priority
      />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            maxWidth: "500px",
            width: "90%", // Responsive width for smaller screens
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          {step === 1 && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6">Enter Username</Typography>
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
              <Typography variant="h6">Verify Secure Word</Typography>
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
              <Typography variant="h6">Enter Password</Typography>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button
                id="login-modal-button"
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
      </Modal>
    </>
  );
};

export default LoginFlowModal;