import { create } from "zustand";

type soa_ModalState = {
    isOpen: boolean;
    selectedLRN: string | null;
    open: (lrn: string) => void;
    close: () => void;
};

export const useUploadSoaModal = create<soa_ModalState>((set) => ({
    isOpen: false,
    selectedLRN: null,
    open: (lrn: string) => set({ isOpen: true, selectedLRN: lrn }),
    close: () => set({ isOpen: false, selectedLRN: null }),
}));