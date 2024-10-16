import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";

export function Header() {
  return (
    <header className="h-20 w-full flex items-center shadow-2xl">
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl select-none font-bold">
            <span className="text-blue-500">Dev</span>Controll
          </h1>
        </Link>

        <div className="flex gap-4">
          <Link href="/dashboard">
            <FiUser size={26} />
          </Link>
          <button>
            <FiLogOut size={26} />
          </button>
        </div>
      </div>
    </header>
  );
}
