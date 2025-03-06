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
      <View style={styles.row}>
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
    flex: 1,
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
  // header: {
  //   flexDirection: "row",
  //   paddingVertical: 10,
  //   backgroundColor: "#f0f0f0",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ccc",
  // },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  // cell: {
  //   flex: 1,
  //   textAlign: "center",
  //   paddingHorizontal: 12, // adds space between each column
  // },
});

export default BudgetTable;
