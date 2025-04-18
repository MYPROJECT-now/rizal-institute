import { create } from "zustand";

type ReApplyState = {
    trackingId: string;
    setReApplyTrackingId: (id: string) => void;
};

export const useReApplyStore = create<ReApplyState>((set) => ({
    trackingId: "",
    setReApplyTrackingId: (id) => set({ trackingId: id }),
}));


