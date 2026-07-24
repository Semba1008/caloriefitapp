import { requireUser } from "@/lib/session";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Nav } from "@/components/ui/Nav";

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-10">
        <div className="rounded-2xl bg-white/90 p-6 shadow-sm shadow-slate-900/[0.03] ring-1 ring-slate-900/5 sm:p-7">
          <h1 className="mb-6 text-xl font-bold tracking-tight text-slate-900">設定</h1>
          <ProfileForm defaults={user} submitLabel="更新する" />
        </div>
      </main>
    </div>
  );
}
