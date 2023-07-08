import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@moeindana/google-oauth";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import "../Styles/login.scss";
// import Navbar from "../Components/Navbar/Navbar";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSuccess = (response) => {
    console.log(response);
    var decoded = jwt_decode(response.credential);
    navigate("/");
    console.log(decoded);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission here
    // You can use the 'email' and 'password' state values to perform authentication

    // Example:
    if (email === "example@example.com" && password === "password") {
      navigate("/");
    } else {
      console.log("Login Failed");
    }
  };

  return (
  
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleFormSubmit} sx={{ width: "100%", marginTop: 1 }}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </form>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Or
      </Typography>
      <GoogleOAuthProvider clientId="933928110298-3qbsnc8et2do0j4bm78cjgt0so9bo154.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError}>
          <Button variant="contained" fullWidth>
            Login with Google
          </Button>
        </GoogleLogin>
      </GoogleOAuthProvider>
    </Container>
  );
};

export default Login;
