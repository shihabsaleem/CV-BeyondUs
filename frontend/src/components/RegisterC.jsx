import React, { useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@moeindana/google-oauth";
import "../Styles/login.scss";

const RegisterC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Handle register form submission here
    // You can use the form data to create a new user account
    console.log("Register form submitted");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        name,
        email,
        password,
      });
  
      const data = response.data;
      console.log(data);
  
      setShowAlert(true);
      setAlertMessage("Registration successful");
  
      // Redirect to the home page after a delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
  
      setShowAlert(true);
      setAlertMessage("Registration failed");
    }
  };
  

  const handleAlertClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const handleGoogleSuccess = async (response) => {
    console.log(response);
    const { tokenId } = response;
    const { name, email } = response;

    console.log('Token ID:', tokenId);
  
    const password = tokenId; // Use the Google authentication token as the password
    
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        name,
        email,
        password,
      });
  
      const user = response.data;
      console.log(user);
  
      setShowAlert(true);
      setAlertMessage("Registration successful");
  
      // Redirect to the home page after a delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
  
      setShowAlert(true);
      setAlertMessage("Registration failed");
    }
  };
  
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        User Registration
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
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
          Register
        </Button>
      </form>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Or register with Google
      </Typography>
      <GoogleOAuthProvider clientId="585823466341-qb1dngvv98l4tjj4ml4vom3bkcv3du2a.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleGoogleSuccess}>
          <Button variant="contained" fullWidth>
            Register with Google
          </Button>
        </GoogleLogin>
      </GoogleOAuthProvider>
      <Snackbar open={showAlert} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertMessage.includes("successful") ? "success" : "error"}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterC;
