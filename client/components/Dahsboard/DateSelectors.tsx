// components/Dashboard/DateSelectors.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useMonthStore } from "@/store/useMonthStore";
import { useYearStore } from "@/store/useYearStore";

const DateSelectors = () => {
  const { selectedMonth, setSelectedMonth } = useMonthStore();
  const currentYear = new Date().getFullYear();
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
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
  ];

  const { selectedYear, setSelectedYear } = useYearStore();
  console.log(selectedYear);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Month:</Text>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
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
        </View>

        <View style={styles.column}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  picker: {
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
  },
});

export default DateSelectors;
