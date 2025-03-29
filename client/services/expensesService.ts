import axios from "axios";
const API_URL_EXPENSES = "http://192.168.1.7:5000/v1/expenses";

export const createExpense = async (expenseData: {
  amount: number;
  date: string;
  description: string;
  user_id: number;
  category_id: number;
}) => {
  try {
    const response = await axios.post(`${API_URL_EXPENSES}`, expenseData);
    console.log(response);
  } catch (error) {
    console.error("Error adding budget: ", error);
    throw error;
  }
};
