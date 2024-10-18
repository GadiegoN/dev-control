"use client";

import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { status } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogOut() {
    await signOut();
  }

  return (
    <header className="h-20 w-full flex items-center shadow-2xl">
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl select-none font-bold">
            <span className="text-blue-500">Dev</span>Controll
          </h1>
        </Link>

        {status === "loading" && (
          <button>
            <FiLoader className="animate-spin" size={26} />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex gap-4">
            <Link href="/dashboard">
              <FiUser size={26} />
            </Link>
            <button onClick={handleLogOut}>
              <FiLogOut size={26} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
