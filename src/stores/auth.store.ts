import { create } from "zustand";

export interface InfoUserType {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: InfoUserType | null;
  setUser: (user: InfoUserType) => void;
  logout: VoidFunction;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export const getState = useAuthStore.getState
