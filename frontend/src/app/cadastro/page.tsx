"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const schema = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(4, "Senha muito curta"),
});

type FormData = z.infer<typeof schema>;

export default function CadastroPage() {
  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/usuarios/cadastro", data);
      toast.success("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.mensagem || "Erro ao cadastrar");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-md bg-white dark:bg-neutral-900">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Criar conta</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <Input placeholder="Seu nome completo" {...register("nome")} />
          {errors.nome && <p className="text-sm text-red-500 mt-1">{errors.nome.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <Input type="email" placeholder="seu@email.com" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <Input
            type={mostrarSenha ? "text" : "password"}
            placeholder="••••••••"
            {...register("senha")}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-9 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white"
          >
            {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.senha && <p className="text-sm text-red-500 mt-1">{errors.senha.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>

        <div className="text-sm text-center mt-4 text-neutral-700 dark:text-neutral-300">
          <span>Já tem uma conta? </span>
          <Link href="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </div>
      </form>
    </div>
  );
}
