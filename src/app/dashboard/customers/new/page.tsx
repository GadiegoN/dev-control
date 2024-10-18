import Link from "next/link";
import { Form } from "../../components/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  return (
    <>
      <div className="py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Novo cliente</h1>

        <Link
          href="/dashboard/customers"
          className="bg-blue-500 px-4 py-1 rounded-md text-background"
        >
          Voltar
        </Link>
      </div>

      <Form userId={session?.user.id} />
    </>
  );
}
