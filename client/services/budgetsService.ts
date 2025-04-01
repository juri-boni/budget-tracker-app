import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/v1";
const API_URL_BUDGETS = `${API_URL}/budget`;

export const createBudget = async (budgetData: {
  amount: number;
  month: number;
  year: number;
  user_id: number;
  category_id: number;
}) => {
  try {
    const response = await axios.post(`${API_URL_BUDGETS}`, budgetData);
    // console.log(response);
  } catch (error) {
    console.error("Error adding budget: ", error);
    throw error;
  }
};
