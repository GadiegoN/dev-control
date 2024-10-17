import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardItem } from "../components/card";

export default async function Customers() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

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
        <CardItem />
        <CardItem />
        <CardItem />
      </section>
    </>
  );
}
