import { requireUser } from "@/lib/session";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Brand } from "@/components/ui/Brand";

export default async function OnboardingPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-14">
      <Brand className="mb-8 text-lg" />
      <div className="w-full max-w-md rounded-2xl bg-white/90 p-7 shadow-xl shadow-slate-900/[0.04] ring-1 ring-slate-900/5 backdrop-blur-sm">
        <h1 className="mb-2 text-xl font-bold tracking-tight text-slate-900">プロフィール設定</h1>
        <p className="mb-6 text-sm text-slate-500">
          身長・体重などの情報を入力すると、毎日の運動目標とトレーニングメニューを自動で提案します。
        </p>
        <ProfileForm defaults={user} submitLabel="はじめる" />
      </div>
    </div>
  );
}
