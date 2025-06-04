import { create } from "zustand";

type Application_ModalState = {
    isOpen: boolean;
     open: () => void;
     close: () => void;
};

export const useApplicationModal = create<Application_ModalState>((set) => ({
    isOpen: true, //change mo maya
     open: () => set ({ isOpen: true}),
     close: () => set ({ isOpen: false}),
}));


// store
// import { create } from "zustand";

// type Application_ModalState = {
//   isOpen: boolean;
//   open: () => void;
//   close: () => void;
//   checkAndOpen: () => void;
// };

// export const useApplicationModal = create<Application_ModalState>((set) => ({
//   isOpen: false,
//   open: () => set({ isOpen: true }),
//   close: () => {
//     localStorage.setItem("modal_shown", "true");
//     set({ isOpen: false });
//   },
//   checkAndOpen: () => {
//     const hasShown = localStorage.getItem("modal_shown");
//     if (!hasShown) {
//       set({ isOpen: true });
//     }
//   },
// }));
