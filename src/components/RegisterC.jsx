import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@moeindana/google-oauth";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Styles/login.scss"

const RegisterC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSuccess = (response) => {
    console.log(response);
    // Handle successful authentication with Google
    navigate("/dashboard"); // Redirect to the dashboard or desired page
  };

  const handleError = () => {
    console.log("Google Authentication Failed");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle register form submission here
    // You can use the form data to create a new user account

    console.log("Register form submitted");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    navigate("/dashboard"); // Redirect to the dashboard or desired page
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
      <Typography className="text" variant="h4" component="h1" gutterBottom>
        User Registration
      </Typography>
      <form onSubmit={handleFormSubmit} sx={{ width: "100%", marginTop: 1 }}>
        <TextField className="roundcorner"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField className="roundcorner"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField className="roundcorner"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button  className="roundcorner" type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </form>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Or register with Google
      </Typography>
      <GoogleOAuthProvider clientId="933928110298-3qbsnc8et2do0j4bm78cjgt0so9bo154.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError}>
          <Button variant="contained" fullWidth>
            Register with Google
          </Button>
        </GoogleLogin>
      </GoogleOAuthProvider>
    </Container>
  );
};

export default RegisterC;
