import Link from "next/link";
import { TicketItem } from "./components/ticket";
import Button from "@/components/button";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      customer: true,
    },
  });

  return (
    <>
      <div className="py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chamados</h1>

        <Link href="/dashboard/new">
          <Button>Abrir chamado</Button>
        </Link>
      </div>

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
              <th className="font-bold text-gray-600 uppercase text-center">
                #
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <>
                {ticket.status === "aberto" && (
                  <TicketItem
                    key={ticket.id}
                    customer={ticket.customer}
                    ticket={ticket}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <p className="text-xl font-bold text-center">Sem chamados abertos</p>
        )}
      </div>

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
              <th className="font-bold text-gray-600 uppercase text-center">
                #
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <>
                {ticket.status === "fechado" && (
                  <TicketItem
                    key={ticket.id}
                    customer={ticket.customer}
                    ticket={ticket}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <p className="text-xl font-bold text-center">Sem chamados Fechados</p>
        )}
      </div>
    </>
  );
}
