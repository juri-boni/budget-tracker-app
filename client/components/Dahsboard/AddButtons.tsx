// components/Dashboard/AddButtons.tsx
import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

const AddButtons = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Add Expense"
          onPress={() => {
            // Navigate to the expense form route (update route as needed)
            router.push("/expenses");
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Add Category"
          onPress={() => {
            // Navigate to the category form route (update route as needed)
            router.push("/categories");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default AddButtons;
