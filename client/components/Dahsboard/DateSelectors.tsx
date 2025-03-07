// components/Dashboard/DateSelectors.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DateSelectors = () => {
  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "Whole Year",
  ];
  const years = [
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
  ];

  // Temporary state; later, connect these to Zustand
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Month:</Text>
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        style={styles.picker}
      >
        {months.map((month, index) => (
          <Picker.Item
            key={index}
            label={month}
            value={(index + 1).toString()}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Year:</Text>
      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
        style={styles.picker}
      >
        {years.map((year, index) => (
          <Picker.Item
            key={index}
            label={year.toString()}
            value={year.toString()}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
});

export default DateSelectors;
