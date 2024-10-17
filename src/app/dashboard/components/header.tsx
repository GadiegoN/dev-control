import { NavLink } from "@/components/nav-link";

export function DashboardHeader() {
  return (
    <div className="bg-foreground text-background rounded-md">
      <header className="flex gap-4 py-2 px-4">
        <NavLink href="/dashboard">Chamados</NavLink>
        <NavLink href="/dashboard/customers">Clientes</NavLink>
      </header>
    </div>
  );
}
