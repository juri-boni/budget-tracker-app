// components/Dashboard/TableRow.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TableRowProps = {
  category: string;
  amount: number;
  description: string;
  date: string;
};

export const TableRow: React.FC<TableRowProps> = ({
  amount,
  category,
  description,
  date,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{amount} €</Text>
      <Text style={styles.cell}>{category}</Text>
      <Text style={styles.cell}>{description}</Text>
      <Text style={styles.cell}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 14,
  },
});

export default TableRow;
