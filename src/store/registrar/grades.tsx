import { create } from "zustand";

type Reg_Grades_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useRegGradesModal = create<Reg_Grades_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
