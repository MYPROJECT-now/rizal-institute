import { create } from "zustand";

type Grades_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useShowGradesModal = create <Grades_ModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
