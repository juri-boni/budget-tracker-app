import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/v1";
const API_URL_EXPENSES = `${API_URL}/expenses`;

export const createExpense = async (expenseData: {
  amount: number;
  date: string;
  description: string;
  user_id: number;
  category_id: number;
}) => {
  // console.log("CREATE EXPENSE :  DATA :", expenseData);
  try {
    const response = await axios.post(`${API_URL_EXPENSES}`, expenseData);
    // console.log("CREATE NEW EXPENSE -  RES: ", response);
  } catch (error) {
    console.error("Error adding expense: ", error);
    throw error;
  }
};

export const getAllExpenses = async () => {
  try {
    const response = await axios.get(`${API_URL_EXPENSES}`);
    // console.log("response = ", response);
    const data = response.data;
    const results = data.results;
    return results;
  } catch (error) {
    console.error("Error getting all expenses ", error);
  }
};

export const getExpensesByMonthYear = async ({
  month,
  year,
  page,
  uid = "1", // opzionale, se serve
}: {
  month: string;
  year: string;
  page: number;
  uid?: string;
}) => {
  try {
    const response = await axios.get(`${API_URL_EXPENSES}`, {
      params: {
        uid,
        month,
        year,
        page,
      },
    });

    const res = response.data.results;
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};
