import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { Brand } from "@/components/ui/Brand";

export default function RegisterPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <Brand className="mb-8 text-lg" />
      <div className="w-full max-w-sm rounded-2xl bg-white/90 p-7 shadow-xl shadow-slate-900/[0.04] ring-1 ring-slate-900/5 backdrop-blur-sm">
        <h1 className="mb-6 text-xl font-bold tracking-tight text-slate-900">新規登録</h1>
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-slate-500">
          既にアカウントをお持ちの方は{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
