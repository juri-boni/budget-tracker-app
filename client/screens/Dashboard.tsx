// app/dashboard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BudgetTable } from "@/components/Dahsboard/BudgetTable";

export const Dashboard = () => {
  // Dummy data for testing
  const dummyCategories = [
    { id: "1", category: "Food", budget: 500, spent: 350, residual: 150 },
    { id: "2", category: "Transport", budget: 200, spent: 50, residual: 150 },
    { id: "3", category: "Health", budget: 350, spent: 120, residual: 230 },
    // Add more categories as needed
  ];

  // Calculate totals from dummyCategories
  const dummyTotal = {
    budget: dummyCategories.reduce((acc, cat) => acc + cat.budget, 0),
    spent: dummyCategories.reduce((acc, cat) => acc + cat.spent, 0),
    residual: dummyCategories.reduce((acc, cat) => acc + cat.residual, 0),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard Screen</Text>
      <BudgetTable categories={dummyCategories} total={dummyTotal} />
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
    marginBottom: 16,
  },
});
