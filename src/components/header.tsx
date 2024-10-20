"use client";

import Link from "next/link";
import {
  FiBook,
  FiLoader,
  FiLock,
  FiLogOut,
  FiShare2,
  FiUser,
} from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./button";
import { toast } from "sonner";

export function Header() {
  const { status } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogOut() {
    await signOut();
  }

  async function copyLinkToClipboard(link: string) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(link);
        toast.success("Link copiado para o a area de transferencia!");
      } else {
        toast.error("Clipboard API não é suportada neste navegador.");
      }
    } catch (error) {
      toast.warning("Erro ao copiar o link. Tente novamente!");
    }
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
          <div className="flex gap-2 items-center">
            <Button variant="ghost">
              <Link href="/create-ticket">
                <FiBook size={24} />
              </Link>
            </Button>
            <Button variant="ghost" onClick={handleLogin}>
              <FiLock size={26} />
            </Button>
          </div>
        )}

        {status === "authenticated" && (
          <div className="flex gap-4">
            <Button variant="ghost">
              <Link href="/dashboard">
                <FiUser size={26} />
              </Link>
            </Button>
            <Button
              onClick={() =>
                copyLinkToClipboard(
                  "https://dev-control-one.vercel.app/create-ticket"
                )
              }
              variant="ghost"
            >
              <FiShare2 size={26} />
            </Button>
            <Button variant="destructive" onClick={handleLogOut}>
              <FiLogOut size={26} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
