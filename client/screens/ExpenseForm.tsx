// app/ExpenseForm.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const ExpenseForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ExpenseForm Screen</Text>
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
