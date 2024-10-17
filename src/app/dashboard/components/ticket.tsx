import { FiFile, FiTrash2 } from "react-icons/fi";

export function TicketItem() {
  return (
    <>
      <tr className="border-b-2 last:border-b-0 border-blue-200 h-16 hover:bg-blue-100 duration-200">
        <td className="text-left pl-2 rounded-bl-lg font-bold text-gray-600 truncate max-w-[150px]">
          Gadiego Nogueira
        </td>
        <td className="text-left">01/04/2024</td>
        <td className="text-center">
          <span className="bg-green-500 px-2 py-1 rounded-lg uppercase">
            Aberto
          </span>
        </td>
        <td className="rounded-br-lg">
          <div className="flex gap-2 justify-center">
            <button>
              <FiTrash2 size={24} className="text-red-500" />
            </button>
            <button>
              <FiFile size={24} className="text-blue-500" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
