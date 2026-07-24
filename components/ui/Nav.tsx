"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/dashboard", label: "今日" },
  { href: "/history/week", label: "週間履歴" },
  { href: "/history/month", label: "月間履歴" },
  { href: "/settings", label: "設定" },
];

export function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <div className="flex gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-gray-500 hover:text-red-600"
        >
          ログアウト
        </button>
      </div>
    </nav>
  );
}
