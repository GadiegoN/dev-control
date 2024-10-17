"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`font-bold duration-300 ${
        pathname === href
          ? "text-blue-300"
          : "text-gray-100 hover:text-blue-300"
      }`}
    >
      {children}
    </Link>
  );
}
