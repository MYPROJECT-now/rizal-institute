import { create } from "zustand";

//Preview Image Modal
type PreviewImageModalState = {
  isOpen: boolean;
  imageUrl: string | null;
  open: (url: string) => void;
  close: () => void;
};

export const usePreviewImageModal = create<PreviewImageModalState>((set) => ({
  isOpen: false,
  imageUrl: null,
  open: (url: string) => set({ isOpen: true, imageUrl: url }),
  close: () => set({ isOpen: false, imageUrl: null }),
}));


//Show Remarks Modal
type ShowRemarksModalState = {
  isOpen: boolean;
  regRemarks: string | null;
  cashierRemarks: string | null;
  regDate: string | null;
  cashierDate: string | null;
  open: (remarks: { regRemarks: string | null; cashierRemarks: string | null; regDate: string | null; cashierDate: string | null }) => void;
  close: () => void;
};

export const useShowRemarksModal = create<ShowRemarksModalState>((set) => ({
  isOpen: false,
  regRemarks: null,
  cashierRemarks: null,
  regDate: null,
  cashierDate: null,
  open: (remarks) => set({ 
    isOpen: true,
    regRemarks: remarks.regRemarks,
    cashierRemarks: remarks.cashierRemarks,
    regDate: remarks.regDate,
    cashierDate: remarks.cashierDate
  }),
  close: () => set({ 
    isOpen: false,
    regRemarks: null,
    cashierRemarks: null,
    regDate: null,
    cashierDate: null
  }),
}));


//Reset Password Modal
type ResetPasswordModalState = {
  isOpen: boolean;
   open: () => void;
   close: () => void;
};

export const useResetPasswordModal = create<ResetPasswordModalState>((set) => ({
  isOpen: false, //change mo maya
   open: () => set ({ isOpen: true}),
   close: () => set ({ isOpen: false}),
}));


//show status to the student
type ShowStatusModalState = {
  isOpen: boolean;
   open: () => void;
   close: () => void;
};

export const useShowStatusModal = create<ShowStatusModalState>((set) => ({
  isOpen: false, //change mo maya
   open: () => set ({ isOpen: true}),
   close: () => set ({ isOpen: false}),
}));
