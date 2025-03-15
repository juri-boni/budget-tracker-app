// app/Categories.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import { SafeArea } from "@/components/utility/safe-area.component";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
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
