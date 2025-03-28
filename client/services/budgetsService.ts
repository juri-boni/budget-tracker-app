import axios from "axios";

const API_URL_BUDGETS = "http://192.168.1.7:5000/v1/budget"; //inserito indirizzo ip del pc per testare da expo Go
// const API_URL_BUDGETS = "http://localhost:5000/v1/budget";

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
