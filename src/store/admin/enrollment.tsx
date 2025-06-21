import { create } from "zustand";

type EnrollmentModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useEnrollmentModal = create<EnrollmentModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
