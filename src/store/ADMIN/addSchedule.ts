import { create } from "zustand";

type ScheduleModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const usescheduleModal = create<ScheduleModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));


type EditScheduleModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useEditScheduleModal = create<EditScheduleModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));

