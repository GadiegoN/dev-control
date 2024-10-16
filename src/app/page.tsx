import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center min-h-[calc(100vh-116px)] gap-2">
      <h2 className="font-medium text-2xl">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl text-blue-600 md:text-4xl">
        Atendimento, clientes
      </h1>

      <Image
        src="/atendimento.png"
        alt="Imagem hero do dev controll"
        width={600}
        height={600}
        className="max-w-sm md:max-w-xl"
      />
    </section>
  );
}
