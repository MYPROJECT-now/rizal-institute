import { create } from "zustand";


//decline remarks modal
type RemarksModalState = {
    isOpen: boolean;
    remarks: string;
    studentId: number | null;
    open: (studentId: number) => void;
    close: () => void;
    setRemarks: (remarks: string) => void;
  };
  
  export const useDeclineRemarksModal = create<RemarksModalState>((set) => ({
    isOpen: false,
    remarks: "",
    studentId: null,
    open: (studentId) => set({ isOpen: true, studentId, remarks: "" }),
    close: () => set({ isOpen: false, studentId: null, remarks: "" }),
    setRemarks: (remarks) => set({ remarks }),
  }));
  


  
type ReservationReview_ModalState = {
    isOpen: boolean;
    selectedLRN: string | null;
    open: (lrn: string) => void;
    close: () => void;
};

export const useShowReservationPayementModal = create<ReservationReview_ModalState>((set) => ({
    isOpen: false, //change mo maya
    selectedLRN: null,
    open: (lrn: string) => set({ isOpen: true, selectedLRN: lrn }),
    close: () => set({ isOpen: false, selectedLRN: null }),
}));
