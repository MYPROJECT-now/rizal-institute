import { create } from "zustand";

type Reg_Students_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useRegStudentsModal = create<Reg_Students_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
