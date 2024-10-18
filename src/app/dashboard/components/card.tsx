import { CustomerProps } from "@/utils/customer.type";

export function CardItem({ customer }: { customer: CustomerProps }) {
  return (
    <article className="flex flex-col bg-gray-200 border-2 gap-2 p-2 rounded-lg hover:scale-105 duration-300">
      <h2>
        <span className="font-bold">Nome: </span>
        {customer.name}
      </h2>
      <p>
        <span className="font-bold">Email: </span>
        {customer.email}
      </p>
      <p>
        <span className="font-bold">Telefone: </span>
        {customer.phone}
      </p>
      {customer.address && (
        <p>
          <span className="font-bold">Endereço: </span>
          {customer.address}
        </p>
      )}

      <button className="bg-red-500 px-4 py-1 self-start rounded-lg text-white">
        Deletar
      </button>
    </article>
  );
}
