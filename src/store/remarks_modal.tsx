import { create } from "zustand";

type RemarksModalState = {
  isOpen: boolean;
  remarks: string;
  studentId: number | null;
  open: (studentId: number) => void;
  close: () => void;
  setRemarks: (remarks: string) => void;
};

export const useRemarksModal = create<RemarksModalState>((set) => ({
  isOpen: false,
  remarks: "",
  studentId: null,
  open: (studentId) => set({ isOpen: true, studentId, remarks: "" }),
  close: () => set({ isOpen: false, studentId: null, remarks: "" }),
  setRemarks: (remarks) => set({ remarks }),
}));
