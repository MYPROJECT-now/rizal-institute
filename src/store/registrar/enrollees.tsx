import { create } from "zustand";

type Reg_Enrollees_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useRegEnrolleesModal = create<Reg_Enrollees_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
