"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/store/useUser";
import { useTarefas } from "@/features/tarefas/useTarefas";
import { NovaTarefaDialog } from "@/features/tarefas/NovaTarefaDialog";
import { DashboardSidebar } from "@/app/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/app/dashboard/DashboardHeader";
import { DashboardResumoCards } from "@/app/dashboard/DashboardResumoCards";
import { DashboardListaTarefas } from "@/app/dashboard/DashboardListaTarefas";
import { DashboardFiltro } from "@/app/dashboard/DashboardFiltro";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const { tarefas, total, pendentes, concluidas, loading } = useTarefas();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <DashboardSidebar />

      <main className="flex-1 p-6 bg-white dark:bg-neutral-950">
        <DashboardHeader nome={user.nome} />

        <div className="flex justify-end mb-6">
          <NovaTarefaDialog />
        </div>

        <DashboardResumoCards
          total={total}
          pendentes={pendentes}
          concluidas={concluidas}
          loading={loading}
        />

        <DashboardFiltro />

        <DashboardListaTarefas
          tarefas={tarefas}
          loading={loading}
        />
      </main>
    </div>
  );
}
