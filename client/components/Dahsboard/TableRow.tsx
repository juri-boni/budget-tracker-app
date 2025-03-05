// components/Dashboard/TableRow.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TableRowProps = {
  category: string;
  budget: number;
  spent: number;
  residual: number;
};

export const TableRow: React.FC<TableRowProps> = ({
  category,
  budget,
  spent,
  residual,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{category}</Text>
      <Text style={styles.cell}>{budget}</Text>
      <Text style={styles.cell}>{spent}</Text>
      <Text style={styles.cell}>{residual}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});
