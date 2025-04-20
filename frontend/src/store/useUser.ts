import { create } from "zustand";

type User = {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "moderador" | "comum";
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUser = create<Store>((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem("token", user.id); // ou apenas manter token separado
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
