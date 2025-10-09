import { create } from "zustand";

type soa_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useUploadSoaModal = create<soa_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));

interface ShowDocumentModalState {
  isOpen: boolean;
  documentUrl: string | null;
  open: (url: string) => void;
  close: () => void;
}

export const useShowDocumentModal = create<ShowDocumentModalState>((set) => ({
  isOpen: false,
  documentUrl: null,
  open: (url) => set({ isOpen: true, documentUrl: url }),
  close: () => set({ isOpen: false, documentUrl: null }),
}));

type grade_ModalState = {
    isOpen: boolean;
    selectedLRN: string | null;
    open: (lrn: string) => void;
    close: () => void;
};

export const useShowGradeModal = create<grade_ModalState>((set) => ({
    isOpen: false, //change mo maya
    selectedLRN: null,
    open: (lrn: string) => set({ isOpen: true, selectedLRN: lrn }),
    close: () => set({ isOpen: false, selectedLRN: null }),
}));
