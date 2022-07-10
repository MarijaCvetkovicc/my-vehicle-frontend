import React, { useContext, useState } from "react";
import AuthForm from "../components/AuthForm";
import LoadingOverlay from "../components/LoadingOverlay";
import { createUser } from "../service/auth";
import { AuthContext } from "../store/auth-context";

const Register = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const registerHandler = async (credentials) => {
    setIsAuthenticating(true);
    let { email, password } = credentials;

    try {
      const user = await createUser(email, password);
      authCtx.authenticate(user);
      setIsAuthenticating(false);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="Register..." />;
  }
  return <AuthForm isLogin={false} onSubmit={registerHandler} />;
};

export default Register;
