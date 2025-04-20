import { create } from "zustand";

type StatusFiltro = "todas" | "pendente" | "concluida";

interface FiltroTarefaStore {
  termo: string;
  status: StatusFiltro;
  setTermo: (valor: string) => void;
  setStatus: (status: StatusFiltro) => void;
}

export const useFiltroTarefas = create<FiltroTarefaStore>((set) => ({
  termo: "",
  status: "todas",
  setTermo: (valor) => set({ termo: valor }),
  setStatus: (status) => set({ status }),
}));
