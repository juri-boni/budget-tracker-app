// components/Expenses/ExpensesTable.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TableRow from "./TableRow";

type ExpensesData = {
  id: string;
  category: string;
  amount: number;
  date: string;
};

type ExpenseTableProps = {
  expenses: ExpensesData[];
};

export const ExpensesTable: React.FC<ExpenseTableProps> = ({ expenses }) => {
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.cell}>Expense</Text>
        <Text style={styles.cell}>Category</Text>
        <Text style={styles.cell}>Date</Text>
      </View>
      {expenses.map((expense) => (
        <TableRow
          key={expense.id}
          amount={expense.amount}
          category={expense.category}
          date={expense.date}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
    // backgroundColor: "#c22b34",
    marginTop: 16,
    padding: 15,
    marginHorizontal: 10, // adds margin on the sides of the table
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ExpensesTable;
