"use client";
import Button from "@/components/button";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { z } from "zod";
import { FormTicket } from "./components/form-ticket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localiza-lo.")
    .min(1, "Campo email é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function Search() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    reset();
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customers", {
      params: {
        email: data.email,
      },
    });

    if (response.data === null) {
      setError("email", {
        type: "min",
        message: "Ops, cliente não encontrado",
      });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 space-y-4">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

      <section>
        {customer ? (
          <div className="flex justify-between items-center bg-blue-50 py-6 px-4 rounded-lg border-2">
            <p className="text-lg">
              <strong>Cliente selecionado</strong> {customer?.name}
            </p>

            <Button variant="destructive" onClick={handleClearCustomer}>
              <FiX size={24} />
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleSearchCustomer)}
            className="bg-slate-200 py-6 px-2 rounded-lg border-2"
          >
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Digite o email do cliente"
                type="email"
                id="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <Button
                type="submit"
                className="flex justify-center items-center gap-2 w-full"
              >
                Procurar cliente
                <FiSearch size={20} />
              </Button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket customer={customer} />}
      </section>
    </div>
  );
}
