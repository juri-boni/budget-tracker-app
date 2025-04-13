// components/Dashboard/TableRow.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TableRowProps = {
  amount: number;
  month: number;
  year: number;
  category: string;
};

export const TableRow: React.FC<TableRowProps> = ({
  amount,
  month,
  year,
  category,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{category}</Text>
      {/* <Text style={styles.cell}>{category}</Text> */}
      {/* <Text style={styles.cell}>
        {month}/{year}
      </Text> */}
      <Text style={styles.cell}>{amount}</Text>
      <Text style={styles.cell}>calc</Text>
      <Text style={styles.cell}>calc</Text>
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
    paddingHorizontal: 12,
  },
});

export default TableRow;
