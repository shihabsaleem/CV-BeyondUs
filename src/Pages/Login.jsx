import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@moeindana/google-oauth";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../Styles/login.scss";

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
    <GoogleOAuthProvider clientId="933928110298-3qbsnc8et2do0j4bm78cjgt0so9bo154.apps.googleusercontent.com">
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};
export default Login;
