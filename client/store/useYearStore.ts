import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type YearState = {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
};

export const useYearStore = create<YearState>()(
  persist(
    (set) => ({
      selectedYear: new Date().getFullYear().toString(), // default to currentYear
      setSelectedYear: (year: string) => set({ selectedYear: year }),
    }),
    {
      name: "year-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
