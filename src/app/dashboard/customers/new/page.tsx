import Link from "next/link";
import { Form } from "../../components/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Button from "@/components/button";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  return (
    <>
      <div className="py-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Novo cliente</h1>

        <Link href="/dashboard/customers">
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      <Form userId={session?.user.id} />
    </>
  );
}
