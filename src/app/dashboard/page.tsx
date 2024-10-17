import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <>
      <div className="py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chamados</h1>

        <Link
          href="/dashboard/new"
          className="bg-blue-500 px-4 py-1 rounded-md text-background"
        >
          Abrir chamado
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
            <TicketItem />
            <TicketItem />
            <TicketItem />
          </tbody>
        </table>
      </div>
    </>
  );
}
