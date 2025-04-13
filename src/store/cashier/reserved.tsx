import { create } from "zustand";

type Cashier_Reserved_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useCashierReservedModal = create<Cashier_Reserved_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
