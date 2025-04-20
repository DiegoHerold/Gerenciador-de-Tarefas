// DashboardHeader.tsx
"use client";

interface DashboardHeaderProps {
  nome: string;
}

export function DashboardHeader({ nome }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">Olá, {nome} 👋</h1>
      <p className="text-muted-foreground">Seja bem-vindo à sua dashboard.</p>
    </div>
  );
}
