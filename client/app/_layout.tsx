// app/_layout.tsx
import React, { ReactNode } from "react";
import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";

// type LayoutProps = {
//   children: ReactNode;
// };

export const Layout: React.FC = () => {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
