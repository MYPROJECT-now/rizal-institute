import { create } from "zustand";

type Reg_Add_Student_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useRegAddStudentModal = create<Reg_Add_Student_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
