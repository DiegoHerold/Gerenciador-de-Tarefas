// DashboardResumoCards.tsx
"use client";

interface DashboardResumoCardsProps {
  total: number;
  pendentes: number;
  concluidas: number;
  loading: boolean;
}

export function DashboardResumoCards({ total, pendentes, concluidas, loading }: DashboardResumoCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <div className="rounded-2xl border p-6 shadow-md bg-gradient-to-br from-blue-100 to-blue-400 dark:from-blue-800 dark:to-blue-600 text-white hover:scale-[1.02] transition-transform">
        <h3 className="text-lg font-semibold">📌 Total de Tarefas</h3>
        <p className="text-3xl mt-2 font-bold tracking-tight">
          {loading ? "..." : total}
        </p>
        <p className="text-sm mt-1 text-blue-50 dark:text-blue-200">Todas as tarefas criadas</p>
      </div>

      <div className="rounded-2xl border p-6 shadow-md bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-800 dark:to-yellow-600 text-white hover:scale-[1.02] transition-transform">
        <h3 className="text-lg font-semibold">⏳ Pendentes</h3>
        <p className="text-3xl mt-2 font-bold tracking-tight">
          {loading ? "..." : pendentes}
        </p>
        <p className="text-sm mt-1 text-yellow-50 dark:text-yellow-100">Aguardando conclusão</p>
      </div>

      <div className="rounded-2xl border p-6 shadow-md bg-gradient-to-br from-green-100 to-green-300 dark:from-green-800 dark:to-green-600 text-white hover:scale-[1.02] transition-transform">
        <h3 className="text-lg font-semibold">✅ Concluídas</h3>
        <p className="text-3xl mt-2 font-bold tracking-tight">
          {loading ? "..." : concluidas}
        </p>
        <p className="text-sm mt-1 text-green-50 dark:text-green-100">Missões completas!</p>
      </div>
    </div>
  );
}
