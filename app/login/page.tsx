import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import { Brand } from "@/components/ui/Brand";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <Brand className="mb-8 text-lg" />
      <div className="w-full max-w-sm rounded-2xl bg-white/90 p-7 shadow-xl shadow-slate-900/[0.04] ring-1 ring-slate-900/5 backdrop-blur-sm">
        <h1 className="mb-6 text-xl font-bold tracking-tight text-slate-900">ログイン</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-center text-sm text-slate-500">
          アカウントをお持ちでない方は{" "}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
