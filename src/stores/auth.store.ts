import { create, } from "zustand";
import { persist} from "zustand/middleware";

export interface InfoUserType {
  id: string;
  email: string;
  name: string;
  role: string,
  birthDate: string;
  createdAt: string;
}

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
export const getStateAuth = useAuthStore.getState
