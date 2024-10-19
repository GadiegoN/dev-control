import Button from "@/components/button";
import { Input } from "@/components/input";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const customers = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "aberto",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }

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
        <form className="flex flex-col gap-4" action={handleRegisterTicket}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ticket"
              className="text-gray-800 text-lg font-medium"
            >
              Nome do chamado
            </label>
            <Input
              type="text"
              id="ticket"
              name="name"
              placeholder="Digite o nome do chamado"
              required
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
              name="description"
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
                  name="customer"
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
