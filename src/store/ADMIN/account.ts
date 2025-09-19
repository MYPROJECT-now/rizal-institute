import { create } from "zustand";

type AccountModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useAccountModal = create<AccountModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
