// components/Dashboard/BudgetTable.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TableRow } from "./TableRow";

import { deleteBudget } from "@/services/budgetsService";

type BudgetsData = {
  id: number;
  amount: number;
  month: number;
  year: number;
  user_id: number;
  category_name: string;
  category_amount_spent: string;
};

type BudgetTableProps = {
  budgets: BudgetsData[];
};

export const BudgetTable: React.FC<BudgetTableProps> = ({ budgets }) => {
  const amounts = budgets
    .sort((a, b) => a.id - b.id)
    .map((budget) => Number(budget.amount));

  const totalAmount = amounts.reduce((x, y) => {
    return x + y;
  }, 0);

  const spents = budgets
    .sort((a, b) => a.id - b.id)
    .map((budget) => Number(budget.category_amount_spent));

  const totalSpent = spents.reduce((x, y) => {
    return x + y;
  }, 0);

  const handleDelete = async (id: number) => {
    console.log("DELETING BUDGET: ", id);
    const res = await deleteBudget(id);
    console.log(res);
  };

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.categoryCell}>Category</Text>
        <Text style={styles.cell}>Amount</Text>
        <Text style={styles.cell}>Spent</Text>
        <Text style={styles.cell}>Residual</Text>
        <Text style={styles.delete}>del</Text>
      </View>
      {budgets &&
        budgets.map((budget) => (
          <TableRow
            key={budget.id}
            amount={budget.amount}
            month={budget.month}
            year={budget.year}
            category={budget.category_name}
            spent={budget.category_amount_spent}
            onDelete={() => handleDelete(budget.id)}
          />
        ))}
      <View style={styles.footer}>
        <Text style={styles.cell}>Total</Text>
        <Text style={styles.cell}>{totalAmount}</Text>
        <Text style={styles.cell}>{totalSpent}</Text>
        <Text style={styles.cell}>
          {(Number(totalAmount) - Number(totalSpent)).toFixed(2)}
        </Text>
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
  categoryCell: {
    flex: 1.2,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 12,
  },
  delete: {
    flex: 0.5,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default BudgetTable;
