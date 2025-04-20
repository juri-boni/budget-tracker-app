// app/Expenses.tsx
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, ScrollView } from "react-native";
import ExpensesTable from "@/components/Expenses/ExpensesTable";
import DateSelectors from "@/components/DateSelectors";
import {
  getAllExpenses,
  getExpensesByMonthYear,
} from "@/services/expensesService";
import { useMonthStore } from "@/store/useMonthStore";
import { useYearStore } from "@/store/useYearStore";

interface ExpensesData {
  id: number;
  amount: number;
  category_id: number;
  category_name: string;
  date: string;
  description: string;
  user_id: number;
}

export const Expenses = () => {
  const { selectedMonth, setSelectedMonth } = useMonthStore();
  const { selectedYear, setSelectedYear } = useYearStore();
  const [expenses, setExpenses] = useState<ExpensesData[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchExpenses = async () => {
        // const result = await getAllExpenses();
        const result = await getExpensesByMonthYear({
          month: selectedMonth,
          year: selectedYear,
        });
        setExpenses(result);
      };

      fetchExpenses();
    }, [selectedMonth, selectedYear])
  );

  return (
    <ScrollView style={styles.container}>
      <DateSelectors></DateSelectors>
      <ExpensesTable expenses={expenses}></ExpensesTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});
