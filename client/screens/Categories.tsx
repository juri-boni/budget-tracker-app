// app/Categories.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { getAllCategories } from "@/services/categoriesService";

interface CategoryData {
  id: number;
  name: string;
  user_id: number;
}

export const Categories = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  // console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (err) {}
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      {categories &&
        categories.map((category) => (
          <Text key={category.id}>{category.name}</Text>
        ))}
      <Text style={styles.text}>Categories Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});
