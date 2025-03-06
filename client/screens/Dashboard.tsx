// app/dashboard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import { BudgetTable } from "@/components/Dahsboard/BudgetTable";
import { BudgetTable } from "../components/Dahsboard/BudgetTable";

export const Dashboard = () => {
  // Dummy data for testing
  const dummyCategories = [
    { id: "1", category: "Food", budget: 500, spent: 350, residual: 150 },
    { id: "2", category: "Transport", budget: 200, spent: 50, residual: 150 },
    { id: "3", category: "Health", budget: 350, spent: 120, residual: 230 },
    { id: "4", category: "Grocery", budget: 145, spent: 120, residual: 25 },
    { id: "5", category: "Comics", budget: 25, spent: 35, residual: -10 },
    { id: "6", category: "Weapons", budget: 1480, spent: 1200, residual: 280 },
    { id: "7", category: "Animals", budget: 85, spent: 0, residual: 85 },
    { id: "8", category: "Gym", budget: 265, spent: 265, residual: 0 },
    { id: "9", category: "Movies", budget: 145, spent: 120, residual: 25 },
    { id: "10", category: "Dinner", budget: 350, spent: 350, residual: 0 },
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
      {/* <Text style={styles.text}>Dashboard Screen</Text> */}

      <BudgetTable categories={dummyCategories} total={dummyTotal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
  },
  // text: {
  //   fontSize: 18,
  //   color: "#000",
  //   marginBottom: 16,
  // },
});
