import { create } from "zustand";

type ADD_Payment_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useAddPaymentModal = create<ADD_Payment_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
