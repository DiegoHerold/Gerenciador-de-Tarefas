"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/services/api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tarefa } from "./useTarefas";
import { useState } from "react";

const schema = z.object({
  titulo: z.string().min(2),
  descricao: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function EditarTarefaDialog({ tarefa }: { tarefa: Tarefa }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.put(`/tarefas/${tarefa.id}`, data);
      toast.success("Tarefa atualizada!");
      setOpen(false);
      window.location.reload(); // ou atualize no estado
    } catch {
      toast.error("Erro ao atualizar tarefa");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
          ✏️ Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Input placeholder="Título" {...register("titulo")} />
            {errors.titulo && <p className="text-sm text-red-500">{errors.titulo.message}</p>}
          </div>
          <div>
            <Input placeholder="Descrição (opcional)" {...register("descricao")} />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Salvar alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
