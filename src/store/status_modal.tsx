import { create } from "zustand";

type StatusModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useStatusModal = create<StatusModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
