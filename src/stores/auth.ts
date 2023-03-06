import { AuthUserData } from "@/openapi/generated";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAuthStore {
  user?: AuthUserData;
  setUser: (user?: AuthUserData) => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (user?: AuthUserData) => set({ user }),
      }),
      {
        name: "__microlend__auth",
      }
    )
  )
);
