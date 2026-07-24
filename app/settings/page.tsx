import { requireUser } from "@/lib/session";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Nav } from "@/components/ui/Nav";

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-10">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-xl font-bold text-gray-900">設定</h1>
          <ProfileForm defaults={user} submitLabel="更新する" />
        </div>
      </main>
    </div>
  );
}
