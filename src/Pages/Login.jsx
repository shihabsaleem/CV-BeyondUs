import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@moeindana/google-oauth";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    console.log(response);
    var decoded = jwt_decode(response.credential);
    navigate("/voter");
    console.log(decoded);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="http://933928110298-3qbsnc8et2do0j4bm78cjgt0so9bo154.apps.googleusercontent.com">
      <div>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
