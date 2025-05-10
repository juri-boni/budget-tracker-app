// app/dashboard.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, ScrollView } from "react-native";
import { BudgetTable } from "../components/Dahsboard/BudgetTable";
import DateSelectors from "@/components/DateSelectors";
import AddButtons from "@/components/Dahsboard/AddButtons";
import { ExpenseModal } from "@/components/Dahsboard/Modals/ExpenseModal";
import CategoryModal from "@/components/Dahsboard/Modals/CategoryModal";
import BudgetModal from "@/components/Dahsboard/Modals/BudgetModal";

import { getBudgets, getBudgetsByMonthYear } from "@/services/budgetsService";
import { useMonthStore } from "@/store/useMonthStore";
import { useYearStore } from "@/store/useYearStore";

interface BudgetsData {
  id: number;
  amount: number;
  month: number;
  year: number;
  user_id: number;
  category_name: string;
}

export const Dashboard = () => {
  const { selectedMonth, setSelectedMonth } = useMonthStore();
  const { selectedYear, setSelectedYear } = useYearStore();

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgets, setBudgets] = useState<BudgetsData[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchBudgets = async () => {
        const result = await getBudgetsByMonthYear({
          month: selectedMonth,
          year: selectedYear,
        });
        setBudgets(result);
      };

      fetchBudgets();
    }, [selectedMonth, selectedYear])
  );

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
        <BudgetTable budgets={budgets} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 16,
  },
});
