import { create } from "zustand";

type EditAssignModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useEditAssignModal = create<EditAssignModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));

type DeleteAssignModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useDeleteAssignModal = create<DeleteAssignModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));