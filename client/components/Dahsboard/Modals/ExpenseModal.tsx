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
import { Calendar } from "react-native-calendars";
import { createExpense } from "@/services/expensesService";
import { getAllCategories } from "@/services/categoriesService";
interface ExpenseModalProps {
  isExpenseModalOpen: boolean;
  setIsExpenseModalOpen: (open: boolean) => void;
}

interface ExpenseData {
  amount: number;
  date: string;
  description: string;
  user_id: number;
  category_id: number;
}

interface CategoryData {
  id: number;
  name: string;
  user_id: number;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isExpenseModalOpen,
  setIsExpenseModalOpen,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [selectedDateString, setSelectedDateString] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (err) {}
    };
    fetchCategories();
  }, [isExpenseModalOpen]);

  // const handleSubmit = () => {
  //   console.log({
  //     selectedDate,
  //     selectedCategory,
  //     amount,
  //   });
  //   setIsExpenseModalOpen(false);
  // };

  const expenseData: ExpenseData = {
    amount: amount,
    date: selectedDate,
    description: description,
    user_id: 1,
    category_id: selectedCategory,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // console.log(budgetData);
      const result = await createExpense(expenseData);
      // console.log(result);
    } catch (error) {
      console.error("failed to add a new expense: ", error);
    }
    setIsExpenseModalOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isExpenseModalOpen}
      onRequestClose={() => setIsExpenseModalOpen(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Insert Expense</Text>

          <Text>Seleziona la data:</Text>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(new Date(day.dateString).toISOString());
              setSelectedDateString(day.dateString);
            }}
            markedDates={{
              [selectedDateString]: {
                selected: true,
                selectedColor: "#2196F3",
              },
            }}
            style={styles.calendar}
          />

          <Text>Categoria:</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
            prompt="Seleziona una categoria"
          >
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
          </Picker>

          <Text>Importo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Inserisci l'importo"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Text>Descrizione:</Text>
          <TextInput
            style={styles.input}
            placeholder="Inserisci la descrizione"
            value={description}
            onChangeText={setDescription}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Invia Spesa</Text>
          </Pressable>

          <Pressable
            style={styles.closeButton}
            onPress={() => setIsExpenseModalOpen(false)}
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
  calendar: {
    marginVertical: 8,
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

export default ExpenseModal;
