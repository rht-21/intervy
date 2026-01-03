import { create } from "zustand";

type UIState = {
  isAuthDialogOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;

  isLoading: boolean;
  openLoader: () => void;
  closeLoader: () => void;

  isCreateInterviewModalOpen: boolean;
  openCreateInterviewModal: () => void;
  closeCreateInterviewModal: () => void;

  fetchInterviewList: boolean;
  setFetchInterviewList: (fetchInterviewList: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isAuthDialogOpen: false,
  openAuthDialog: () => set({ isAuthDialogOpen: true }),
  closeAuthDialog: () => set({ isAuthDialogOpen: false }),

  isLoading: false,
  openLoader: () => set({ isLoading: true }),
  closeLoader: () => set({ isLoading: false }),

  isCreateInterviewModalOpen: false,
  openCreateInterviewModal: () => set({ isCreateInterviewModalOpen: true }),
  closeCreateInterviewModal: () => set({ isCreateInterviewModalOpen: false }),

  fetchInterviewList: false,
  setFetchInterviewList: (fetchInterviewList: boolean) =>
    set({ fetchInterviewList }),
}));
