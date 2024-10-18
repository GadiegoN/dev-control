import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not autorized." }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed create new customer." },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not autorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const customerId = searchParams.get("id");

  if (!customerId) {
    return NextResponse.json({ error: "Not autorized." }, { status: 401 });
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: customerId,
    },
  });

  if (findTickets) {
    return NextResponse.json(
      { error: "Failed delete customer." },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: customerId,
      },
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed delete customer." },
      { status: 400 }
    );
  }
}
