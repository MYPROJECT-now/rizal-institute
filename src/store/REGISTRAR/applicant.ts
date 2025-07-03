import { create } from "zustand";

//Applicant Info Modal
type Applicant_ModalState = {
  isOpen: boolean;
  selectedLRN: string | null;
  open: (lrn: string) => void;
  close: () => void;
};





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
  

  // document modal
  type Document_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};


export const useShowApplicantInfoModal = create<Applicant_ModalState>((set) => ({
  isOpen: false,
  selectedLRN: null,
  open: (lrn: string) => set({ isOpen: true, selectedLRN: lrn }),
  close: () => set({ isOpen: false, selectedLRN: null }),
}));

export const useShowDocumentModal = create<Document_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
