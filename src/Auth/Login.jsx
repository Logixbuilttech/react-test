import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

 const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/register");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `http://localhost:4000/users?email=${email}&password=${password}`
    );
    if (res.data.length > 0) {
      login(res.data[0]);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <>
      <Box className="p-5">
        <h2 className="text-lg font-bold mb-6 block">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <TextField
            name="email"
            label="email"
            variant="outlined"
            type="text"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="password"
            label="password"
            variant="outlined"
            type="password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="flex items-center gap-4">
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Button variant="contained"  onClick={handleClick}>
            Create Account
          </Button>
          </div>
        </form>
      </Box>
    </>
  );
};
export default Login;
