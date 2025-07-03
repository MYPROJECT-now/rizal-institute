import { create } from "zustand";

type Fiscal_Year_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useFiscalYearModal = create<Fiscal_Year_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
