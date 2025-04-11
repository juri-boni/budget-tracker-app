import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/v1";
const API_URL_CATEGORIES = `${API_URL}/categories`;

export const createCategory = async (categoryData: {
  name: string;
  user_id: number;
}) => {
  try {
    const response = await fetch(`${API_URL_CATEGORIES}`, {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create Category. Status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// TODO: convert function into getAllCategoriesByUserId
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL_CATEGORIES}`);
    // console.log("getAllCategories RESPONSE: ", response);
    const data = response.data;
    const results = data.results;
    return results;
  } catch (error) {
    console.error(error);
  }
};
