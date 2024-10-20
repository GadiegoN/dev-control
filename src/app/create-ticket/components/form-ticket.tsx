"use client";
import Button from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomerDataInfo } from "../page";

const schema = z.object({
  name: z.string().min(1, "Nome do chamado é obrigatório."),
  description: z.string().min(1, "Descrição do chamado é obrigatório."),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    reset();
  }

  return (
    <form
      className="bg-slate-200 mt-8 py-6 px-2 rounded-lg border-2 space-y-4"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <div className="flex flex-col">
        <label htmlFor="name">Nome do chamado</label>
        <Input
          id="name"
          placeholder="Digite o nome do chamado"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          placeholder="Digite a drescrição do chamado"
          {...register("description")}
          className="rounded-lg py-2 px-4 h-24 resize-none border-b-2 border-blue-500 outline-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Cadastrar chamado
      </Button>
    </form>
  );
}
