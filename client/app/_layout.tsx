// app/_layout.tsx
import React from "react";
import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export const Layout: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" hidden={false} translucent={false} />
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
