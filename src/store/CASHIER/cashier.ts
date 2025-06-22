import { create } from "zustand";

type Upload_SOA_ModalState = {
    isOpen: boolean;
    selectedLRN: string | null;
    open: (lrn: string) => void;
    close: () => void;
};

export const useUploadSOAModal = create<Upload_SOA_ModalState>((set) => ({
    isOpen: false, //change mo maya
    selectedLRN: null,
    open: (lrn: string) => set({ isOpen: true, selectedLRN: lrn }),
    close: () => set({ isOpen: false, selectedLRN: null }),
}));
