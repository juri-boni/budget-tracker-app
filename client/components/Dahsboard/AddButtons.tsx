// components/Dashboard/AddButtons.tsx
import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

interface AddButtonsProps {
  isExpenseModalOpen: boolean;
  setIsExpenseModalOpen: (open: boolean) => void;
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (open: boolean) => void;
  isBudgetModalOpen: boolean;
  setIsBudgetModalOpen: (open: boolean) => void;
}

const AddButtons: React.FC<AddButtonsProps> = ({
  isExpenseModalOpen,
  setIsExpenseModalOpen,
  isCategoryModalOpen,
  setIsCategoryModalOpen,
  isBudgetModalOpen,
  setIsBudgetModalOpen,
}) => {
  console.log("isExpenseModalOpen ? ", isExpenseModalOpen);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Expense"
          onPress={() => {
            // Navigate to the expense form route (update route as needed)
            // router.push("/expenses");
            console.log("Open Expense Modal");
            setIsExpenseModalOpen(!isExpenseModalOpen);
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Category"
          onPress={() => {
            // Navigate to the category form route (update route as needed)
            // router.push("/categories");
            console.log("Open Category Modal");
            setIsCategoryModalOpen(!isCategoryModalOpen);
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Budget"
          onPress={() => {
            // Navigate to the category form route (update route as needed)
            // router.push("/categories");
            console.log("Open Budget Modal");
            setIsBudgetModalOpen(!isBudgetModalOpen);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default AddButtons;
