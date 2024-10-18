import { NavLink } from "@/components/nav-link";

export function DashboardHeader() {
  return (
    <div className="bg-foreground text-background rounded-md">
      <header className="flex gap-2 items-center justify-around h-10 px-4">
        <NavLink href="/dashboard">Chamados</NavLink>
        <div className="border h-10 border-gray-400 bg-slate-400" />
        <NavLink href="/dashboard/customers">Clientes</NavLink>
        <div className="border h-10 border-gray-400 bg-slate-400" />
        <NavLink href="/dashboard/customers/new">Novo Cliente</NavLink>
        <div className="border h-10 border-gray-400 bg-slate-400" />
        <NavLink href="/dashboard/new">Novo Chamado</NavLink>
      </header>
    </div>
  );
}
