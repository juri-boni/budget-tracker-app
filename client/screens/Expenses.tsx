// app/Expenses.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ExpensesTable from "@/components/Expenses/ExpensesTable";
import { getAllExpenses } from "@/services/expensesService";

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
  const [expenses, setExpenses] = useState<ExpensesData[]>([]);
  console.log("EXPENSES: ", expenses);

  useFocusEffect(
    useCallback(() => {
      const fetchExpenses = async () => {
        const result = await getAllExpenses();
        setExpenses(result);
      };

      fetchExpenses();
    }, [])
  );

  // useEffect(() => {
  //   const fetchExpenses = async () => {
  //     const result = await getAllExpenses();
  //     // console.log("result === ", result);
  //     setExpenses(result);
  //     // console.log(result);
  //   };

  //   fetchExpenses();
  // }, []);

  // const dummyExpenses = [
  //   { id: "01", category: "Grocery", amount: 24.33, date: "01/02/2025" },
  //   { id: "02", category: "Transport", amount: 4.03, date: "06/02/2025" },
  //   { id: "03", category: "Comics", amount: 12.55, date: "09/02/2025" },
  //   { id: "04", category: "Wapons", amount: 102.65, date: "28/02/2025" },
  //   { id: "05", category: "Animals", amount: 99.99, date: "25/02/2025" },
  //   { id: "06", category: "Beverage", amount: 45.23, date: "25/03/2025" },
  //   { id: "07", category: "Gym", amount: 65.23, date: "31/03/2025" },
  //   { id: "08", category: "Food", amount: 65.23, date: "01/03/2025" },
  //   { id: "09", category: "Food", amount: 99.01, date: "14/03/2025" },
  //   { id: "10", category: "Dinner", amount: 22.53, date: "12/03/2025" },
  //   { id: "11", category: "Food", amount: 85.26, date: "25/03/2025" },
  //   { id: "12", category: "Health", amount: 10.2, date: "25/02/2025" },
  //   { id: "13", category: "Weapons", amount: 65.23, date: "25/02/2025" },
  //   { id: "14", category: "Food", amount: 100.23, date: "05/05/2025" },
  //   { id: "15", category: "Movies", amount: 16.07, date: "15/04/2025" },
  //   { id: "16", category: "Gym", amount: 17.2, date: "17/03/2025" },
  //   { id: "17", category: "Health", amount: 44.13, date: "16/02/2025" },
  //   { id: "18", category: "Health", amount: 57.75, date: "11/01/2025" },
  //   { id: "19", category: "Food", amount: 88.88, date: "25/05/2025" },
  //   { id: "20", category: "Movies", amount: 12.01, date: "05/04/2025" },
  // ];

  return (
    <ScrollView style={styles.container}>
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
