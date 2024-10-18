import Link from "next/link";
import { CardItem } from "../components/card";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Customers() {
  const session = await getServerSession(authOptions);

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <div className="py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus clientes</h1>

        <Link
          href="/dashboard/customers/new"
          className="bg-blue-500 px-4 py-1 rounded-md text-background"
        >
          Novo cliente
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((item) => (
          <CardItem customer={item} />
        ))}
      </section>
    </>
  );
}
