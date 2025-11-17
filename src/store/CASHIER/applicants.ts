import { create } from "zustand";


//decline remarks modal
type RemarksModalState = {
    isOpen: boolean;
    remarks: string;
    studentId: number | null;
    fullName: string;
    open: (studentId: number, fullName: string) => void;
    close: () => void;
    setRemarks: (remarks: string) => void;
  };
  
  export const useDeclineRemarksModal = create<RemarksModalState>((set) => ({
    isOpen: false,
    remarks: "",
    studentId: null,
    fullName: "",
    open: (studentId, fullName) => set({ isOpen: true, studentId, fullName, remarks: "" }),
    close: () => set({ isOpen: false, studentId: null, remarks: "" }),
    setRemarks: (remarks) => set({ remarks }),
  }));
  
    type RemarksStudentModalState = {
    isOpen: boolean;
    remarks: string;
    month_id: number | null;
    lrn: string;
    open: (month_id: number, lrn: string) => void;
    close: () => void;
    setRemarks: (remarks: string) => void;
    };

    export const useDeclineStudentRemarksModal = create<RemarksStudentModalState>((set) => ({
    isOpen: false,
    remarks: "",
    month_id: null,
    lrn: "",
    open: (month_id, lrn) => set({ isOpen: true, month_id, lrn, remarks: "" }),
    close: () => set({ isOpen: false, month_id: null, lrn: "", remarks: "" }),
    setRemarks: (remarks) => set({ remarks }),
    }));


type Receipts_ModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useShowReceiptsModal = create<Receipts_ModalState>((set) => ({
    isOpen: false, //change mo maya
    open: () => set ({ isOpen: true}),
    close: () => set ({ isOpen: false}),
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



type DiscountCLassModalState = {
    isOpen: boolean;
    selectedLRN: string | null;
    open: (lrn: string) => void;
    close: () => void;
};
export const useDiscountClass = create<DiscountCLassModalState>((set) => ({
    isOpen: false, //change mo maya
    selectedLRN: null,
    open: (lrn: string) => set({ isOpen: true, selectedLRN: lrn }),
    close: () => set({ isOpen: false, selectedLRN: null }),
}));

