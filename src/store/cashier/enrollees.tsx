import { create } from "zustand";

type Cashier_Enrollees_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useCashierEnrolleesModal = create<Cashier_Enrollees_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
