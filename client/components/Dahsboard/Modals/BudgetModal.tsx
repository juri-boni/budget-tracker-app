// components/Dashboard/BudgetModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

import { createBudget } from "@/services/budgetsService";
import { getAllCategories } from "@/services/categoriesService";

interface BudgetModalProps {
  isBudgetModalOpen: boolean;
  setIsBudgetModalOpen: (open: boolean) => void;
}

interface BudgetData {
  amount: number;
  month: number;
  year: number;
  user_id: number;
  category_id: number;
}

interface CategoryData {
  id: number;
  name: string;
  user_id: number;
}

export const BudgetModal: React.FC<BudgetModalProps> = ({
  isBudgetModalOpen,
  setIsBudgetModalOpen,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [amount, setAmount] = useState(0);
  // console.log("amount type: ", typeof amount);
  // console.log("selectedMonth type: ", typeof selectedMonth);
  // console.log("selectedYear type: ", typeof selectedYear);

  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (err) {}
    };
    fetchCategories();
  }, [isBudgetModalOpen]);

  const months = [
    // { code: 0, name: "Whole Year" },
    { code: 1, name: "January" },
    { code: 2, name: "February" },
    { code: 3, name: "March" },
    { code: 4, name: "April" },
    { code: 5, name: "May" },
    { code: 6, name: "June" },
    { code: 7, name: "July" },
    { code: 8, name: "August" },
    { code: 9, name: "September" },
    { code: 10, name: "October" },
    { code: 11, name: "November" },
    { code: 12, name: "December" },
  ];

  const years = [
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
    new Date().getFullYear() + 2,
  ];

  // const categories = [
  //   { id: "1", name: "Food" },
  //   { id: "2", name: "Transport" },
  //   { id: "3", name: "Entertainment" },
  // ];

  const budgetData: BudgetData = {
    amount: amount,
    month: selectedMonth,
    year: selectedYear,
    user_id: 1,
    category_id: selectedCategory,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // console.log(budgetData);
      const result = await createBudget(budgetData);
      // console.log(result);
    } catch (error) {
      console.error("failed to add a new budget: ", error);
    }
    setIsBudgetModalOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isBudgetModalOpen}
      onRequestClose={() => setIsBudgetModalOpen(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Insert Budget</Text>

          <Text>Month:</Text>
          <Picker
            mode="dropdown"
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
          >
            {months &&
              months.map((month) => (
                <Picker.Item
                  key={month.code}
                  label={month.name}
                  value={month.code}
                />
              ))}
          </Picker>

          <Text>Year:</Text>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            style={styles.picker}
            prompt="Select a Year"
          >
            {years &&
              years.map((year, index) => (
                <Picker.Item key={index} label={year} value={year} />
              ))}
          </Picker>

          <Text>Category:</Text>
          <Picker
            mode="dropdown"
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
            prompt="Select a Category"
          >
            {categories &&
              categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
          </Picker>

          <Text>Amount:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Budget</Text>
          </Pressable>

          <Pressable
            style={styles.closeButton}
            onPress={() => setIsBudgetModalOpen(false)}
          >
            <Ionicons name="close-circle" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  picker: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 10,
  },
});

export default BudgetModal;
