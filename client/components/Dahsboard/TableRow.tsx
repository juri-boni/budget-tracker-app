// components/Dashboard/TableRow.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type TableRowProps = {
  amount: number;
  month: number;
  year: number;
  category: string;
  onDelete: () => void;
};

export const TableRow: React.FC<TableRowProps> = ({
  amount,
  month,
  year,
  category,
  onDelete,
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
      <TouchableOpacity onPress={onDelete} style={styles.cell}>
        <Ionicons name="trash-outline" size={15} color="red" />
      </TouchableOpacity>
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
