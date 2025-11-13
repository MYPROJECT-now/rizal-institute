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

type AddAnnouncementModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useAddAnnouncement = create<AddAnnouncementModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));

type EditAnnouncementModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useEditAnnouncement = create<EditAnnouncementModalState>((set) => ({
    isOpen: false, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));