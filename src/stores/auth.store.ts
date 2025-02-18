import { create } from "zustand";

export interface InfoUser {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: InfoUser | null;
  setUser: (user: InfoUser) => void;
  logout: VoidFunction;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export const getState = useAuthStore.getState
