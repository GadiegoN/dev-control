import { CustomerProps } from "./customer.type";

export interface TicketProps {
  customer: CustomerProps | null;
  name: string;
  id: string;
  description: string;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
  customerId: string | null;
  userId: string | null;
}
