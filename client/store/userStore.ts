import { create } from "zustand";
import { UserRegister } from "../types";

interface UserState {
  user: UserRegister | null;
  EducationalBackground: any
  setEducationalBackGround: (background: any) => void
  setUserInformation: (info: Partial<UserRegister>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  EducationalBackground: null,
  setEducationalBackGround: (background: any) => {
    set((state) => ({
      EducationalBackground: { ...background }
    }))
  },
  setUserInformation: (info: any) =>
    set((state) => ({
      user: { ...state.user, ...info },
    })),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
