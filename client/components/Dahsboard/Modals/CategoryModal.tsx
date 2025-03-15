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

interface CategoryModalProps {
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (open: boolean) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isCategoryModalOpen,
  setIsCategoryModalOpen,
}) => {
  // Local state for the form inputs
  const [selectedMonth, setSelectedMonth] = useState("00");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState("");

  // Dummy data arrays
  const months = [
    { code: "00", name: "Whole Year" },
    { code: "01", name: "January" },
    { code: "02", name: "February" },
    { code: "03", name: "March" },
    { code: "04", name: "April" },
    { code: "05", name: "May" },
    { code: "06", name: "June" },
    { code: "07", name: "July" },
    { code: "08", name: "August" },
    { code: "09", name: "September" },
    { code: "10", name: "October" },
    { code: "11", name: "November" },
    { code: "12", name: "December" },
  ];

  const years = [
    new Date().getFullYear().toString(),
    (new Date().getFullYear() + 1).toString(),
    (new Date().getFullYear() + 2).toString(),
  ];

  const handleSubmit = () => {
    console.log({
      selectedMonth,
      selectedYear,
      selectedCategory,
      category,
    });

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
