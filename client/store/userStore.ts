import { create } from "zustand";
import { UserRegister } from "@/types";

interface UserState {
  user: UserRegister | null;
  setUserInformation: (info: Partial<UserRegister>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUserInformation: (info: any) =>
    set((state) => ({
      user: { ...state.user, ...info },
    })),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
