// components/Dashboard/BudgetTable.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TableRow } from "./TableRow";

type BudgetsData = {
  id: number;
  amount: number;
  month: number;
  year: number;
  user_id: number;
  category_name: string;
};

type BudgetTableProps = {
  budgets: BudgetsData[];
};

export const BudgetTable: React.FC<BudgetTableProps> = ({ budgets }) => {
  const amounts = budgets
    .sort((a, b) => a.id - b.id) // o ordina per month/year se preferisci
    .map((budget) => Number(budget.amount));

  const total = amounts.reduce((x, y) => {
    return x + y;
  }, 0);
  // console.log(total);

  // console.log(amounts);
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.cell}>Caetgory</Text>
        <Text style={styles.cell}>Amount</Text>
        <Text style={styles.cell}>Spent</Text>
        <Text style={styles.cell}>Residual</Text>
      </View>
      {budgets &&
        budgets.map((budget) => (
          <TableRow
            key={budget.id}
            amount={budget.amount}
            month={budget.month}
            year={budget.year}
            category={budget.category_name}
          />
        ))}
      <View style={styles.footer}>
        <Text style={styles.cell}>Total</Text>
        <Text style={styles.cell}>{total}</Text>
        <Text style={styles.cell}>calc</Text>
        <Text style={styles.cell}>calc</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
    marginTop: 16,
    padding: 15,
    marginHorizontal: 10,
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default BudgetTable;
