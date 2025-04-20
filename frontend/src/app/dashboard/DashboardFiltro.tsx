"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFiltroTarefas } from "@/features/tarefas/useFiltroTarefas";

type StatusFiltro = "todas" | "pendente" | "concluida";

const filtros: { label: string; value: StatusFiltro }[] = [
  { label: "Todas", value: "todas" },
  { label: "Pendentes", value: "pendente" },
  { label: "Concluídas", value: "concluida" },
];

export function DashboardFiltro() {
  const { termo, setTermo, status, setStatus } = useFiltroTarefas();
  const [busca, setBusca] = useState(termo);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTermo(busca);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [busca]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <Input
        placeholder="🔍 Buscar tarefa..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full md:max-w-sm"
      />

      <div className="flex gap-2 flex-wrap">
        {filtros.map((filtro) => (
          <button
            key={filtro.value}
            onClick={() => setStatus(filtro.value)}
            className={`px-4 py-1 rounded-full border text-sm transition font-medium
              ${status === filtro.value
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"}`}
          >
            {filtro.label}
          </button>
        ))}
      </div>
    </div>
  );
}
