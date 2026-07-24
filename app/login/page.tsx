import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-xl font-bold text-gray-900">ログイン</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="mt-4 text-sm text-gray-600">
          アカウントをお持ちでない方は{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
