import { AuthUserData } from "@/openapi/generated";
import { SecureStorage } from "@/utils/storage";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAuthStore {
  user?: AuthUserData;
  setUser: (user?: AuthUserData) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (user?: AuthUserData) => set({ user }),
        logout: () => {
          set({ user: undefined });
          SecureStorage.instance().clearItems();
        },
      }),
      {
        name: "__ml__as__",
        storage: SecureStorage.instance(),
      }
    )
  )
);
