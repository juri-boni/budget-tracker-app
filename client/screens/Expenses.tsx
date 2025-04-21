// app/Expenses.tsx
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // oppure Feather, MaterialIcons, ecc.

import { StyleSheet, ScrollView, View } from "react-native";
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
  const [currentPage, setCurrentPage] = useState(1);
  const isLastPage = expenses.length < 10;

  useFocusEffect(
    useCallback(() => {
      const fetchExpenses = async () => {
        // const result = await getAllExpenses();
        const result = await getExpensesByMonthYear({
          month: selectedMonth,
          year: selectedYear,
          page: currentPage,
        });
        setExpenses(result);
      };

      fetchExpenses();
    }, [selectedMonth, selectedYear, currentPage])
  );

  return (
    <ScrollView style={styles.container}>
      <DateSelectors></DateSelectors>
      <ExpensesTable expenses={expenses}></ExpensesTable>
      <View style={styles.paginationContainer}>
        <Icon
          name="chevron-back"
          size={30}
          onPress={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={currentPage === 1 ? styles.disabled : styles.icon}
        />
        <Icon
          name="chevron-forward"
          size={30}
          onPress={isLastPage ? undefined : () => setCurrentPage((p) => p + 1)}
          style={isLastPage ? styles.disabled : styles.icon}
        />
      </View>
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
  },
  icon: {
    color: "#000",
  },
  disabled: {
    color: "#ccc",
  },
});
