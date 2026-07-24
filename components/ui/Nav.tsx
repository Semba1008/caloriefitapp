"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Brand } from "@/components/ui/Brand";

const LINKS = [
  { href: "/dashboard", label: "今日" },
  { href: "/history/week", label: "週間履歴" },
  { href: "/history/month", label: "月間履歴" },
  { href: "/settings", label: "設定" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-10 border-b border-slate-900/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-6">
          <Brand />
          <div className="flex gap-1">
            {LINKS.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm font-medium text-slate-500 transition hover:text-rose-600"
        >
          ログアウト
        </button>
      </div>
    </nav>
  );
}
