import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, View } from "react-native";

import { Colors } from "../constants/styles";
import Button from "./Button";
import ButtonFlat from "./ButtonFlat";
import Input from "./Input";

const AuthForm = ({ isLogin, onSubmit }) => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    emailIsInvalid: false,
    passwordIsInvalid: false,
    passwordsDontMatch: false,
  });

  const { emailIsInvalid, passwordIsInvalid, passwordsDontMatch } =
    credentialsInvalid;

  let { email, password, confirmPassword } = formData;
  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case "email":
        setFormData({ ...formData, email: enteredValue });
        break;

      case "password":
        setFormData({ ...formData, password: enteredValue });
        break;
      case "confirmPassword":
        setFormData({ ...formData, confirmPassword: enteredValue });
        break;
    }
  };

  const submitHandler = () => {
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        emailIsInvalid: !emailIsValid,
        passwordIsInvalid: !passwordIsValid,
        passwordsDontMatch: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onSubmit({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  };

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={email}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />

        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={password}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={confirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log in" : "Register"}
          </Button>
        </View>
        <View style={styles.buttons}>
          <ButtonFlat onPress={switchAuthModeHandler}>
            {isLogin ? "Create a new user" : "Log in to existing account"}
          </ButtonFlat>
        </View>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    width: "80%",
    padding: 20,
    backgroundColor: Colors.primary900,
  },
  buttons: {
    marginTop: 12,
  },
});
