import { useEffect, useState, useMemo } from "react";
import { api } from "@/services/api";
import { useUser } from "@/store/useUser";
import { useFiltroTarefas } from "./useFiltroTarefas";

export type Tarefa = {
  id: string;
  titulo: string;
  descricao?: string;
  concluida: boolean;
};

export function useTarefas() {
  const { user } = useUser();
  const { termo, status } = useFiltroTarefas();
  const [tarefasOriginais, setTarefasOriginais] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const carregarTarefas = async () => {
      try {
        const { data } = await api.get(`/tarefas/usuario/${user.id}`);
        setTarefasOriginais(data);
      } catch (err) {
        console.error("Erro ao buscar tarefas", err);
      } finally {
        setLoading(false);
      }
    };

    carregarTarefas();
  }, [user]);

  const tarefas = useMemo(() => {
    return tarefasOriginais.filter((t) => {
      const correspondeBusca = t.titulo.toLowerCase().includes(termo.toLowerCase()) ||
                               t.descricao?.toLowerCase().includes(termo.toLowerCase());

      const correspondeStatus =
        status === "todas" ||
        (status === "pendente" && !t.concluida) ||
        (status === "concluida" && t.concluida);

      return correspondeBusca && correspondeStatus;
    });
  }, [tarefasOriginais, termo, status]);

  return {
    tarefas,
    total: tarefasOriginais.length,
    pendentes: tarefasOriginais.filter((t) => !t.concluida).length,
    concluidas: tarefasOriginais.filter((t) => t.concluida).length,
    loading,
  };
}
