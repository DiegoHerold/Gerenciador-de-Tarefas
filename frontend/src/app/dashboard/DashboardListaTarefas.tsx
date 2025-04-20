// DashboardListaTarefas.tsx
"use client";

import { Tarefa } from "@/features/tarefas/useTarefas";
import { EditarTarefaDialog } from "@/features/tarefas/EditarTarefaDialog";
import { toast } from "sonner";
import { api } from "@/services/api";

interface DashboardListaTarefasProps {
  tarefas: Tarefa[];
  loading: boolean;
}

export function DashboardListaTarefas({ tarefas, loading }: DashboardListaTarefasProps) {
  const concluirTarefa = async (id: string) => {
    try {
      await api.put(`/tarefas/${id}`, { concluida: true });
      toast.success("Tarefa marcada como concluída!");
      window.location.reload();
    } catch {
      toast.error("Erro ao concluir tarefa");
    }
  };

  const excluirTarefa = async (id: string) => {
    try {
      await api.delete(`/tarefas/${id}`);
      toast.success("Tarefa excluída!");
      window.location.reload();
    } catch {
      toast.error("Erro ao excluir tarefa");
    }
  };

  return (
    <div className="rounded-xl border p-4 bg-neutral-50 dark:bg-neutral-900">
      <h2 className="text-xl font-bold mb-4">📋 Suas Tarefas</h2>

      {loading ? (
        <p className="text-muted-foreground">Carregando tarefas...</p>
      ) : tarefas.length === 0 ? (
        <p className="text-muted-foreground">Você ainda não tem tarefas.</p>
      ) : (
        <ul className="space-y-4">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className="p-4 bg-white dark:bg-neutral-800 rounded-xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {tarefa.titulo}
                  {tarefa.concluida && (
                    <span className="ml-2 text-green-600 dark:text-green-400 text-sm font-normal">
                      ✔ Concluída
                    </span>
                  )}
                </h3>
                {tarefa.descricao && (
                  <p className="text-sm text-muted-foreground mt-1">{tarefa.descricao}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  className="text-sm px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                  onClick={() => concluirTarefa(tarefa.id)}
                  disabled={tarefa.concluida}
                >
                  ✅ Concluir
                </button>

                <EditarTarefaDialog tarefa={tarefa} />

                <button
                  className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                  onClick={() => excluirTarefa(tarefa.id)}
                >
                  🗑️ Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
