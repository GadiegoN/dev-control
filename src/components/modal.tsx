"use client";

import { ModalContext } from "@/providers/modal";
import { MouseEvent, useContext, useRef } from "react";
import { FiX } from "react-icons/fi";
import Button from "./button";

export function ModalTicket() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <div
      className="absolute bg-black/60 w-screen h-screen"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-background shadow-lg w-4/5 mx-auto md:w-1/2 max-w-2xl p-3 rounded-lg"
        >
          <div className="flex justify-between px-2 items-center">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do chamado
            </h1>

            <Button onClick={handleModalVisible} variant="destructive">
              <FiX size={20} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticket?.ticket.name}</p>
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <h2 className="font-bold">Descrição:</h2>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="w-full border-b border-gray-800 my-4" />

          <div className="space-y-4">
            <h1 className="font-bold text-lg">Detalhes do cliente</h1>

            <div className="flex gap-1">
              <h2 className="font-bold">Nome:</h2>
              <p>{ticket?.customer?.name}</p>
            </div>

            <div className="flex gap-1">
              <h2 className="font-bold">Telefone:</h2>
              <p>{ticket?.customer?.phone}</p>
            </div>

            <div className="flex gap-1">
              <h2 className="font-bold">Email:</h2>
              <p>{ticket?.customer?.email}</p>
            </div>
            {ticket?.customer?.address && (
              <div className="flex gap-1">
                <h2 className="font-bold">Endereço:</h2>
                <p>{ticket.customer.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
