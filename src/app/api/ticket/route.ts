import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not autorized" }, { status: 401 });
  }

  const { id } = await req.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json(
      { error: "Failed updated ticket." },
      { status: 400 }
    );
  }

  const newStatus = findTicket.status === "aberto" ? "fechado" : "aberto";

  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: newStatus,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/new");

    return NextResponse.json({ message: "Ticket fechado com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Not autorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  const { customerId, name, description } = await req.json();

  if (!customerId || !name || !description) {
    return NextResponse.json(
      { error: "Failed create new ticket" },
      { status: 400 }
    );
  }

  try {
    await prismaClient.ticket.create({
      data: {
        name,
        description,
        status: "aberto",
        customerId,
      },
    });

    revalidatePath("/dashboard");

    return NextResponse.json({ message: "Cadastrado com sucesso!" });
  } catch (error) {
    NextResponse.json({ error: "Failed create new ticket" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { id } = await req.json();

    const findTicket = await prismaClient.ticket.findFirst({
      where: {
        id: id as string,
      },
    });

    if (!findTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    await prismaClient.ticket.delete({
      where: {
        id: id as string,
      },
    });

    revalidatePath("/dashboard");

    return NextResponse.json(
      { message: "Ticket deletado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar o ticket:", error);
    return NextResponse.json(
      { error: "Failed to delete ticket" },
      { status: 500 }
    );
  }
}
