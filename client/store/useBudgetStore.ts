import { create } from "zustand";

type BudgetState = {
  selectedMonth: string;
  selectedYear: string;
  setSelectedMonth: (month: string) => void;
  setSelectedYear: (year: string) => void;
};

export const useBudgetStore = create<BudgetState>((set) => ({
  selectedMonth: new Date().toISOString().slice(5, 7),
  selectedYear: new Date().toISOString().slice(0, 4),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedYear: (year) => set({ selectedYear: year }),
}));
