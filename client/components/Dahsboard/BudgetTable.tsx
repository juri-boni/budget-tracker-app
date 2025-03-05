// components/Dashboard/BudgetTable.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TableRow } from "./TableRow";

type CategoryData = {
  id: string;
  category: string;
  budget: number;
  spent: number;
  residual: number;
};

type BudgetTableProps = {
  categories: CategoryData[];
  total: { budget: number; spent: number; residual: number };
};

export const BudgetTable: React.FC<BudgetTableProps> = ({
  categories,
  total,
}) => {
  return (
    <View style={styles.table}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.cell}>Category</Text>
        <Text style={styles.cell}>Budget</Text>
        <Text style={styles.cell}>Spent</Text>
        <Text style={styles.cell}>Residual</Text>
      </View>

      {/* Rows */}
      {categories.map((cat) => (
        <TableRow
          key={cat.id}
          category={cat.category}
          budget={cat.budget}
          spent={cat.spent}
          residual={cat.residual}
        />
      ))}

      {/* Footer (Total Row) */}
      <View style={styles.footer}>
        <Text style={styles.cell}>Total</Text>
        <Text style={styles.cell}>{total.budget}</Text>
        <Text style={styles.cell}>{total.spent}</Text>
        <Text style={styles.cell}>{total.residual}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 8,
    backgroundColor: "#e0e0e0",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});
