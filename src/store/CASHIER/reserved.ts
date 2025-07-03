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