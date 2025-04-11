// components/Dashboard/BudgetTable.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TableRow } from "./TableRow";

// type CategoryData = {
//   id: string;
//   category: string;
//   budget: number;
//   spent: number;
//   residual: number;
// };

// type BudgetTableProps = {
//   categories: CategoryData[];
//   total: { budget: number; spent: number; residual: number };
// };

type BudgetsData = {
  id: number;
  amount: number;
  month: number;
  year: number;
  user_id: number;
  category_id: number;
};

type BudgetTableProps = {
  budgets: BudgetsData[];
};

export const BudgetTable: React.FC<BudgetTableProps> = ({ budgets }) => {
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.cell}>Caetgory</Text>
        {/* <Text style={styles.cell}>DESCRIPTION</Text> */}
        {/* <Text style={styles.cell}>mm/yyyy</Text> */}
        <Text style={styles.cell}>Amount</Text>
        <Text style={styles.cell}>Spent</Text>
        <Text style={styles.cell}>Residual</Text>
      </View>

      {budgets.map((budget) => (
        <TableRow
          key={budget.id}
          amount={budget.amount}
          month={budget.month}
          year={budget.year}
          category={budget.category_id}
        />
      ))}

      {/* <View style={styles.footer}>
        <Text style={styles.cell}>Total</Text>
        <Text style={styles.cell}>{total.budget}</Text>
        <Text style={styles.cell}>{total.spent}</Text>
        <Text style={styles.cell}>{total.residual}</Text>
      </View> */}
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
