import { create } from "zustand";

type TableStudent_ModalState = {
  isOpen: boolean;
  selectedLRN: string | null;
  open: (lrn: string) => void;
  close: () => void;
};

export const useTableStudentModal = create<TableStudent_ModalState>((set) => ({
  isOpen: false,
  selectedLRN: null,
  open: (lrn: string) => set({ isOpen: true, selectedLRN: lrn }),
  close: () => set({ isOpen: false, selectedLRN: null }),
}));
