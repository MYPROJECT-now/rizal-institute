import { create } from "zustand";

type AnnouncementModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useAnnouncement = create<AnnouncementModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));
