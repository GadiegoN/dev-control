import Link from "next/link";
import { TicketItem } from "./components/ticket";
import Button from "@/components/button";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { TicketProps } from "@/utils/ticket.type";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const tickets: TicketProps[] = await prismaClient.ticket.findMany({
    where: {
      customer: {
        userId: session.user.id,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const ticketsAbertos = tickets.filter((ticket) => ticket.status === "aberto");
  const ticketsFechados = tickets.filter(
    (ticket) => ticket.status === "fechado"
  );

  const renderTicketsTable = (tickets: TicketProps[], emptyMessage: string) => (
    <div className="bg-gray-200 rounded-lg shadow-xl">
      <table className="min-w-full my-2">
        <thead className="h-16 border-b-2 border-blue-200">
          <tr>
            <th className="font-bold text-gray-600 uppercase text-left pl-2">
              Cliente
            </th>
            <th className="font-bold text-gray-600 uppercase text-left">
              DT. Cadastro
            </th>
            <th className="font-bold text-gray-600 uppercase text-center">
              Status
            </th>
            <th className="font-bold text-gray-600 uppercase text-center">#</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                customer={ticket.customer}
                ticket={ticket}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-xl font-bold text-center py-4">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chamados</h1>

        <Link href="/dashboard/new">
          <Button>Abrir chamado</Button>
        </Link>
      </div>

      <h1 className="text-lg font-semibold text-gray-600">Chamados Abertos</h1>

      {renderTicketsTable(ticketsAbertos, "Sem chamados abertos")}

      <h1 className="text-lg font-semibold text-gray-600">Chamados Fechados</h1>

      {renderTicketsTable(ticketsFechados, "Sem chamados fechados")}
    </div>
  );
}
