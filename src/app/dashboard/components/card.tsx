"use client";
import Button from "@/components/button";
import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function CardItem({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  async function handleDeleteCustomer(id: string) {
    try {
      await api.delete("/api/customers", {
        params: {
          id,
        },
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className="flex flex-col bg-gray-200 border-2 gap-2 p-2 rounded-lg hover:scale-105 duration-300">
      <h2>
        <span className="font-bold">Nome: </span>
        {customer.name}
      </h2>
      <p>
        <span className="font-bold">Email: </span>
        {customer.email}
      </p>
      <p>
        <span className="font-bold">Telefone: </span>
        {customer.phone}
      </p>
      {customer.address && (
        <p>
          <span className="font-bold">Endereço: </span>
          {customer.address}
        </p>
      )}

      <Button
        variant="destructive"
        onClick={() => handleDeleteCustomer(customer.id)}
      >
        Deletar
      </Button>
    </article>
  );
}
