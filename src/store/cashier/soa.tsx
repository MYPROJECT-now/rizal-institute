import { create } from "zustand";

type Cashier_soa_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useSoaModal = create<Cashier_soa_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
