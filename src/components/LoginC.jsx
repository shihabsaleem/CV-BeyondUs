import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  Checkbox,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GoogleLogin, GoogleOAuthProvider } from "@moeindana/google-oauth";

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
      const user = response.data;
      console.log(user);
      setShowAlert(true);
      setAlertMessage("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
     } catch (error) {
      console.log(error);
      setShowAlert(true);
      setAlertMessage("Login failed");
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const handleGoogleSuccess = async (response) => {
    console.log(response);
    const { tokenId } = response;
    const { email } = response;
    const password = tokenId; // Use the Google authentication token as the password

    try {
      const loginResponse = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
      const user = loginResponse.data;
      console.log(user);
      setShowAlert(true);
      setAlertMessage("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setShowAlert(true);
      setAlertMessage("Login failed");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <Paper
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Container
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Or
            </Typography>
            <GoogleOAuthProvider clientId="585823466341-qb1dngvv98l4tjj4ml4vom3bkcv3du2a.apps.googleusercontent.com">
              <GoogleLogin onSuccess={handleGoogleSuccess}>
                <Button variant="contained" fullWidth>
                  Login with Google
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href={"register"} variant="body2">
                      {"Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </GoogleLogin>
            </GoogleOAuthProvider>
            <Snackbar
              open={showAlert}
              autoHideDuration={4000}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity={
                  alertMessage.includes("successful") ? "success" : "error"
                }
              >
                {alertMessage}
              </Alert>
            </Snackbar>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
