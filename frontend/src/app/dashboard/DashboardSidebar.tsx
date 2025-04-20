// DashboardSidebar.tsx
"use client";

export function DashboardSidebar() {
  return (
    <aside className="w-full lg:w-64 bg-neutral-100 dark:bg-neutral-900 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Gerenciador</h2>
      <nav className="space-y-3">
        <a href="/dashboard" className="block text-sm hover:underline">
          🏠 Dashboard
        </a>
        <a href="#" className="block text-sm hover:underline">
          ✅ Minhas Tarefas
        </a>
        <a href="#" className="block text-sm hover:underline">
          ⚙️ Configurações
        </a>
      </nav>
    </aside>
  );
}