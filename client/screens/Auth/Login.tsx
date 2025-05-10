// app/auth/login.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      {/* Add your login form components here */}
      <Button title="Login" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});
