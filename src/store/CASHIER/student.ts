import { create } from "zustand";

type ShowSOA_ModalState = {
    isOpen: boolean;
    selectedLRN: string | null;
    open: (lrn: string) => void;
    close: () => void;
};

export const useShowSOAModal = create<ShowSOA_ModalState>((set) => ({
    isOpen: false, //change mo maya
    selectedLRN: null,
    open: (lrn: string) => set({ isOpen: true, selectedLRN: lrn }),
    close: () => set({ isOpen: false, selectedLRN: null }),
}));

type MonthlyPayment_ModalState = {
    isOpen: boolean;
    selectedID: number | null;
    open: (monthlyPayment_id: number) => void;
    close: () => void;
};

export const useShowMonthlyPayementModal = create<MonthlyPayment_ModalState>((set) => ({
    isOpen: false, //change mo maya
    selectedID: null,
    open: (monthlyPayment_id: number) => set({ isOpen: true, selectedID: monthlyPayment_id }),
    close: () => set({ isOpen: false, selectedID: null }),
}));

type MonthlyPaymentReceipts_ModalState = {
    isOpen: boolean;
    selectedID: number | null;
    open: (monthlyPayment_id: number) => void;
    close: () => void;
};

export const useShowMonthlyPayementReceiptsModal = create<MonthlyPaymentReceipts_ModalState>((set) => ({
    isOpen: false, //change mo maya
    selectedID: null,
    open: (monthlyPayment_id: number) => set({ isOpen: true, selectedID: monthlyPayment_id }),
    close: () => set({ isOpen: false, selectedID: null }),
}));

type PaymentReceipt_ModalState = {
    isOpen: boolean;
    selectedID: number | null;
    open: (monthlyPayment_id: number) => void;
    close: () => void;
};

export const useShowPaymentReceiptModal = create<PaymentReceipt_ModalState>((set) => ({
    isOpen: false, //change mo maya
    selectedID: null,
    open: (monthlyPayment_id: number) => set({ isOpen: true, selectedID: monthlyPayment_id }),
    close: () => set({ isOpen: false, selectedID: null }),
}));