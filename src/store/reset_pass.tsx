import { create } from "zustand";

type ResetModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useResetModal = create<ResetModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
