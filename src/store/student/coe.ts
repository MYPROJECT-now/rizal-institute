import { create } from "zustand";

type COEModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useCOE = create<COEModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
