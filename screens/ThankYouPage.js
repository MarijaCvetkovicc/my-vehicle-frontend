import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";

const ThankYouPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        Your ride is finished. Thank you for using our application!
      </Text>
    </View>
  );
};

export default ThankYouPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 20,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary800,
  },
});
