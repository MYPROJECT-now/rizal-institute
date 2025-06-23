import { create } from "zustand";

type PaymentModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const usePaymentModal = create<PaymentModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
