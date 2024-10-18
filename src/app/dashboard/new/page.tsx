import Button from "@/components/button";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const customers = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });

  return (
    <>
      <div className="py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Novo chamado</h1>

        <Link href="/dashboard/">
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      {customers.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <p>Sem clientes cadastrados...</p>
          <Link href="/dashboard/customers/new">
            <Button variant="outline">Cadastrar cliente</Button>
          </Link>
        </div>
      ) : (
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ticket"
              className="text-gray-800 text-lg font-medium"
            >
              Nome do chamado
            </label>
            <input
              type="text"
              id="ticket"
              placeholder="Digite o nome do chamado"
              required
              className="rounded-lg border-2 py-2 px-4 h-12"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="problem"
              className="text-gray-800 text-lg font-medium"
            >
              Descreva o problema
            </label>
            <textarea
              id="problem"
              placeholder="Digite o nome do chamado"
              required
              className="rounded-lg border-2 py-2 px-4 h-24 resize-none"
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            {customers.length !== 0 && (
              <>
                <label
                  htmlFor="options"
                  className="text-gray-800 text-lg font-medium"
                >
                  Selecione o cliente
                </label>
                <select
                  id="options"
                  className="rounded-lg border-2 py-2 px-4 h-12"
                >
                  {customers.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={customers.length === 0}
          >
            Cadastrar Chamado
          </Button>
        </form>
      )}
    </>
  );
}
