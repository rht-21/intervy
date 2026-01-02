import { create } from "zustand";

type UIState = {
  isAuthDialogOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;

  isLoading: boolean;
  openLoader: () => void;
  closeLoader: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isAuthDialogOpen: false,
  openAuthDialog: () => set({ isAuthDialogOpen: true }),
  closeAuthDialog: () => set({ isAuthDialogOpen: false }),

  isLoading: false,
  openLoader: () => set({ isLoading: true }),
  closeLoader: () => set({ isLoading: false }),
}));
