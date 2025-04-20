"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(4, "Senha muito curta"),
});

type FormData = z.infer<typeof schema>;

type JwtPayload = {
  id: string;
  email: string;
  role: "admin" | "moderador" | "comum";
  nome: string;
};

export default function LoginPage() {
  const { setUser } = useUser();
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
      const response = await api.post("/usuarios/login", data);
      const token = response.data.token;

      const decoded = jwtDecode<JwtPayload>(token);

      setUser({
        id: decoded.id,
        nome: decoded.nome,
        email: decoded.email,
        role: decoded.role,
      });

      localStorage.setItem("token", token);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.mensagem || "Erro ao fazer login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-md bg-white dark:bg-neutral-900">
      <h1 className="text-3xl font-bold mb-6 text-center">🎯 Acesse sua conta</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <Input type="email" placeholder="seu@email.com" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
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
          {errors.senha && (
            <p className="text-sm text-red-500 mt-1">{errors.senha.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>

        <div className="flex justify-between text-sm mt-4 text-neutral-700 dark:text-neutral-300">
          <Link href="/cadastro" className="hover:underline">
            Criar conta
          </Link>
          <button
            type="button"
            onClick={() => toast.info("Em breve você poderá recuperar sua senha!")}
            className="hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>
      </form>
    </div>
  );
}
