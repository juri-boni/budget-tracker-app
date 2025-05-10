// components/Dashboard/CategoryModal.tsx
import React, { useState } from "react";
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

import { createCategory } from "@/services/categoriesService";

interface CategoryModalProps {
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (open: boolean) => void;
}

interface CategoryData {
  name: string;
  user_id: number;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isCategoryModalOpen,
  setIsCategoryModalOpen,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("00");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState("");

  const months = [
    { code: 0, name: "Whole Year" },
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

  const categoryData: CategoryData = {
    name: category,
    user_id: 1,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createCategory(categoryData);
    } catch (error) {
      console.error("failed to create new category: ", error);
    }
    setIsCategoryModalOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCategoryModalOpen}
      onRequestClose={() => setIsCategoryModalOpen(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Insert Category</Text>

          <Text>Month:</Text>
          <Picker
            mode="dropdown"
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
          >
            {months.map((month) => (
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
            {years.map((year, index) => (
              <Picker.Item key={index} label={year} value={year} />
            ))}
          </Picker>

          <Text>Category:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new Category"
            keyboardType="text"
            value={category}
            onChangeText={setCategory}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Category</Text>
          </Pressable>

          <Pressable
            style={styles.closeButton}
            onPress={() => setIsCategoryModalOpen(false)}
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

export default CategoryModal;
