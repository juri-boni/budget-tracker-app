// components/Dashboard/TableRow.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type TableRowProps = {
  amount: number;
  month: number;
  year: number;
  category: string;
  spent: string;
  onDelete: () => void;
};

export const TableRow: React.FC<TableRowProps> = ({
  amount,
  month,
  year,
  category,
  spent,
  onDelete,
}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.categoryCell}>{category}</Text>
      <Text style={styles.cell}>{amount}€</Text>
      <Text style={styles.cell}>{spent}€</Text>
      <Text style={styles.cell}>
        {(Number(amount) - Number(spent)).toFixed(2)}€
      </Text>
      <TouchableOpacity onPress={onDelete} style={styles.delete}>
        <Ionicons name="trash-outline" size={15} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryCell: {
    flex: 1.5,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  delete: {
    flex: 0.2,
    textAlign: "center",
    paddingHorizontal: 6,
  },
});

export default TableRow;
