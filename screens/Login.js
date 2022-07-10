import React, { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthForm from "../components/AuthForm";
import LoadingOverlay from "../components/LoadingOverlay";
import { login } from "../service/auth";
import { AuthContext } from "../store/auth-context";

const Login = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const submitHandler = async (credentials) => {
    setIsAuthenticating(true);
    let { email, password } = credentials;

    try {
      const user = await login(email, password);
      authCtx.authenticate(user);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthForm isLogin={true} onSubmit={submitHandler} />;
};

export default Login;
