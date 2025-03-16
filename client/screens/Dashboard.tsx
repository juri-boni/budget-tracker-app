// app/dashboard.tsx
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { BudgetTable } from "../components/Dahsboard/BudgetTable";
import DateSelectors from "@/components/Dahsboard/DateSelectors";
import AddButtons from "@/components/Dahsboard/AddButtons";
import { ExpenseModal } from "@/components/Dahsboard/Modals/ExpenseModal";
import CategoryModal from "@/components/Dahsboard/Modals/CategoryModal";
import BudgetModal from "@/components/Dahsboard/Modals/BudgetModal";

export const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

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
  ];

  const dummyTotal = {
    budget: dummyCategories.reduce((acc, cat) => acc + cat.budget, 0),
    spent: dummyCategories.reduce((acc, cat) => acc + cat.spent, 0),
    residual: dummyCategories.reduce((acc, cat) => acc + cat.residual, 0),
  };

  return (
    <View style={styles.container}>
      <DateSelectors></DateSelectors>
      <AddButtons
        isExpenseModalOpen={isExpenseModalOpen}
        setIsExpenseModalOpen={setIsExpenseModalOpen}
        isCategoryModalOpen={isCategoryModalOpen}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
        isBudgetModalOpen={isBudgetModalOpen}
        setIsBudgetModalOpen={setIsBudgetModalOpen}
      ></AddButtons>
      <ExpenseModal
        isExpenseModalOpen={isExpenseModalOpen}
        setIsExpenseModalOpen={setIsExpenseModalOpen}
      ></ExpenseModal>
      <CategoryModal
        isCategoryModalOpen={isCategoryModalOpen}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
      ></CategoryModal>
      <BudgetModal
        isBudgetModalOpen={isBudgetModalOpen}
        setIsBudgetModalOpen={setIsBudgetModalOpen}
      ></BudgetModal>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BudgetTable categories={dummyCategories} total={dummyTotal} />
      </ScrollView>
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
  scrollContainer: {
    paddingBottom: 16,
  },
  // text: {
  //   fontSize: 18,
  //   color: "#000",
  //   marginBottom: 16,
  // },
});
