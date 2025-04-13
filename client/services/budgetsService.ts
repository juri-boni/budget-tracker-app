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
    console.log("createBudget - res ", response);
  } catch (error) {
    console.error("Error adding budget: ", error);
    throw error;
  }
};

export const getBudgets = async () => {
  try {
    const response = await axios.get(`${API_URL_BUDGETS}`);
    const res = response.data.results;
    // console.log("GETTING ALL BUDGETS: ", res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getBudgetsByMonthYear = async (budgetData: {
  month: string;
  year: string;
}) => {
  try {
    const response = await axios.get(`${API_URL_BUDGETS}/by-date`, {
      params: {
        month: budgetData.month,
        year: budgetData.year,
      },
    });
    const res = response.data.results;
    // console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};
