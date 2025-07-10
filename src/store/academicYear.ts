import { create } from "zustand";

type AcadModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useAcadModal = create<AcadModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
