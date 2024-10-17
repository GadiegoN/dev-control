export function CardItem() {
  return (
    <article className="flex flex-col bg-gray-200 border-2 gap-2 p-2 rounded-lg hover:scale-105 duration-300">
      <h2>
        <span className="font-bold">Nome: </span>Nome cliente
      </h2>
      <p>
        <span className="font-bold">Email: </span>cliente@email.com
      </p>
      <p>
        <span className="font-bold">Telefone: </span>9xx999999
      </p>

      <button className="bg-red-500 px-4 py-1 self-start rounded-lg text-white">
        Deletar
      </button>
    </article>
  );
}
