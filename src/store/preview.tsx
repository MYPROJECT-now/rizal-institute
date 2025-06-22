import { create } from "zustand";

type PreviewModalState = {
  isOpen: boolean;
  imageUrl: string | null;
  open: (url: string) => void;
  close: () => void;
};

export const usePreviewModal = create<PreviewModalState>((set) => ({
  isOpen: false,
  imageUrl: null,
  open: (url: string) => set({ isOpen: true, imageUrl: url }),
  close: () => set({ isOpen: false, imageUrl: null }),
}));
