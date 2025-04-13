// store/useMonthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MonthState = {
  selectedMonth: string; // should be a string, e.g., "00"
  setSelectedMonth: (month: string) => void;
};

export const useMonthStore = create<MonthState>()(
  persist(
    (set) => ({
      // selectedMonth: "00", // default to "Whole Year"
      selectedMonth: (new Date().getMonth() + 1).toString().padStart(2, "0"),
      setSelectedMonth: (month: string) => set({ selectedMonth: month }),
    }),
    {
      name: "month-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
