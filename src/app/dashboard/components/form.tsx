"use client";
import Button from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email valido.")
    .min(1, "O campo email é obrigatório"),
  phone: z.string().refine(
    (v) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(v) ||
        /^\d{2}\s\d{9}$/.test(v) ||
        /^\d{11}$/.test(v)
      );
    },
    {
      message: "O numero de telefone deve estar (DD) 999999999",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function Form({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    setIsSubmitting(true);

    try {
      await api.post("/api/customers", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        userId: userId,
      });

      toast.success("Cliente cadastrado com sucesso!");

      router.refresh();
      router.replace("/dashboard/customers");
    } catch (error) {
      toast.error("Erro ao cadastrar cliente. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterCustomer)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-gray-800 text-lg font-medium">
          Nome completo
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Digite o nome completo"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 md:gap-2 gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="phone" className="text-gray-800 text-lg font-medium">
            Telefone
          </label>
          <Input
            id="phone"
            type="number"
            placeholder="Ex: (DD) 9XXXXXXXX"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="email" className="text-gray-800 text-lg font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Digite o email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
      </section>

      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="address" className="text-gray-800 text-lg font-medium">
          Endereço
        </label>
        <Input
          id="address"
          type="text"
          placeholder="Digite o endereço do cliente"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>
      <Button disabled={isSubmitting} type="submit" className="w-full">
        Cadastrar cliente
      </Button>
    </form>
  );
}
