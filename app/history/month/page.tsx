import { requireOnboardedUser } from "@/lib/session";
import { getMonthHistory } from "@/actions/history.actions";
import { parseMonthParam, todayDateOnly } from "@/lib/date";
import { Nav } from "@/components/ui/Nav";
import { MonthView } from "@/components/history/MonthView";

export default async function MonthHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const user = await requireOnboardedUser();
  const { month } = await searchParams;
  const anyDateInMonth = month ? parseMonthParam(month) : todayDateOnly();

  const { start, days, summary } = await getMonthHistory(
    user.id,
    anyDateInMonth,
    user.trainingFrequency,
    user.experienceLevel,
  );

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <h1 className="mb-4 text-lg font-semibold text-gray-900">月間履歴</h1>
        <MonthView monthStart={start} days={days} summary={summary} />
      </main>
    </div>
  );
}
