// app/CategoryForm.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export const CategoryForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CategoryForm Screen</Text>
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
