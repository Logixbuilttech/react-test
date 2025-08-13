import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Alert } from "@mui/material";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:4000/users", { email, password });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Box className="p-5">
      <h2 className="text-lg font-bold mb-6 block">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-5">
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <Button variant="contained" type="submit">
            Register
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Back to Login
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default Registration;
