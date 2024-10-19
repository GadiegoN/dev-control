import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
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

    return NextResponse.json({ message: "Ticket fechado com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Not autorized" }, { status: 401 });
  }
}
