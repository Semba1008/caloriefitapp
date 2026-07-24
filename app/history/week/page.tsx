import { requireOnboardedUser } from "@/lib/session";
import { getWeekHistory } from "@/actions/history.actions";
import { parseDateParam, todayDateOnly } from "@/lib/date";
import { Nav } from "@/components/ui/Nav";
import { WeekView } from "@/components/history/WeekView";

export default async function WeekHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ weekStart?: string }>;
}) {
  const user = await requireOnboardedUser();
  const { weekStart } = await searchParams;
  const anyDateInWeek = weekStart ? parseDateParam(weekStart) : todayDateOnly();

  const { start, days, summary } = await getWeekHistory(
    user.id,
    anyDateInWeek,
    user.trainingFrequency,
    user.experienceLevel,
  );

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <h1 className="mb-4 text-lg font-semibold text-gray-900">週間履歴</h1>
        <WeekView start={start} days={days} summary={summary} />
      </main>
    </div>
  );
}
