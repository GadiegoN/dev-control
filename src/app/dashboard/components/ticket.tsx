"use client";
import Button from "@/components/button";
import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiCheckSquare, FiFile, FiTrash, FiTrash2 } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTicket(id: string) {
    try {
      await api.delete(`/api/ticket`, {
        data: { id: id },
      });

      router.refresh();
    } catch (error) {
      console.error("Erro ao deletar o ticket:", error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 last:border-b-0 border-blue-200 h-16 hover:bg-blue-100 duration-200">
        <td className="text-left pl-2 rounded-bl-lg font-bold text-gray-600 truncate max-w-[150px]">
          {customer?.name}
        </td>
        <td className="text-left">
          {ticket?.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-center">
          <span
            className={`${
              ticket.status === "aberto" ? "bg-green-500" : "bg-red-500"
            } text-white font-semibold px-2 py-1 rounded-lg uppercase`}
          >
            {ticket.status}
          </span>
        </td>
        <td className="rounded-br-lg">
          <div className="flex gap-2 justify-center">
            <Button variant="icon" onClick={handleChangeStatus}>
              <FiCheckSquare
                size={24}
                className={`${
                  ticket.status === "aberto"
                    ? "text-green-500"
                    : "text-orange-500"
                }`}
              />
            </Button>
            <Button variant="icon" onClick={handleOpenModal}>
              <FiFile size={24} className="text-blue-500" />
            </Button>
            <Button
              variant="icon"
              onClick={() => handleDeleteTicket(ticket?.id)}
            >
              <FiTrash size={24} className="text-red-500" />
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}
