import { requireUser } from "@/lib/session";
import { ProfileForm } from "@/components/forms/ProfileForm";

export default async function OnboardingPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-xl font-bold text-gray-900">プロフィール設定</h1>
        <p className="mb-6 text-sm text-gray-600">
          身長・体重などの情報を入力すると、毎日の運動目標とトレーニングメニューを自動で提案します。
        </p>
        <ProfileForm defaults={user} submitLabel="はじめる" />
      </div>
    </div>
  );
}
