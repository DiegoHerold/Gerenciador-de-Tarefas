"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/services/api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUser } from "@/store/useUser";

const schema = z.object({
  titulo: z.string().min(2, "Título obrigatório"),
  descricao: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function NovaTarefaDialog() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/tarefas", {
        ...data,
        usuarioId: user?.id,
      });
      toast.success("Tarefa criada com sucesso!");
      reset();
      setOpen(false);
      window.location.reload(); // ou atualizar via estado
    } catch {
      toast.error("Erro ao criar tarefa");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">➕ Nova Tarefa</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Input placeholder="Título da tarefa" {...register("titulo")} />
            {errors.titulo && <p className="text-sm text-red-500">{errors.titulo.message}</p>}
          </div>
          <div>
            <Input placeholder="Descrição (opcional)" {...register("descricao")} />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Criar Tarefa
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
