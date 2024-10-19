"use client";

import { ModalTicket } from "@/components/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { createContext, ReactNode, useState } from "react";

interface ModalContextData {
  isVisible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  function handleModalVisible() {
    setIsVisible(!isVisible);
  }

  return (
    <ModalContext.Provider value={{ isVisible, handleModalVisible, ticket }}>
      {isVisible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};
