import Link from "next/link";
import { addDays, formatDateParam, weekdayLabel } from "@/lib/date";
import type { HistoryDay, HistorySummary } from "@/actions/history.actions";

export function WeekView({
  start,
  days,
  summary,
}: {
  start: Date;
  days: HistoryDay[];
  summary: HistorySummary;
}) {
  const prevWeekStart = formatDateParam(addDays(start, -7));
  const nextWeekStart = formatDateParam(addDays(start, 7));
  const end = days[days.length - 1].date;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/history/week?weekStart=${prevWeekStart}`}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          ← 前の週
        </Link>
        <p className="text-sm font-medium text-gray-700">
          {formatDateParam(start)} 〜 {formatDateParam(end)}
        </p>
        <Link
          href={`/history/week?weekStart=${nextWeekStart}`}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          次の週 →
        </Link>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryTile label="合計摂取カロリー" value={`${summary.totalCaloriesIn} kcal`} />
        <SummaryTile label="平均摂取カロリー" value={`${summary.avgCaloriesIn} kcal`} />
        <SummaryTile label="合計運動目標" value={`${summary.totalTargetBurnKcal} kcal`} />
        <SummaryTile
          label="筋トレ達成率"
          value={`${Math.round(summary.strengthAdherence * 100)}%`}
        />
      </div>

      <div className="space-y-2">
        {days.map((day) => (
          <div
            key={formatDateParam(day.date)}
            className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3"
          >
            <div className="w-24 text-sm font-medium text-gray-700">
              {day.date.getUTCMonth() + 1}/{day.date.getUTCDate()} ({weekdayLabel(day.date)})
            </div>
            <div className="flex-1 text-sm text-gray-600">
              {day.log ? (
                <>
                  摂取 {day.log.caloriesIn} kcal ・ 運動目標 {day.log.targetBurnKcal} kcal
                </>
              ) : (
                <span className="text-gray-400">未記録</span>
              )}
            </div>
            <div className="w-32 text-right text-sm">
              {day.isRestDay ? (
                <span className="text-gray-400">休養日</span>
              ) : (
                <span className={day.log?.strengthCompleted ? "text-green-600" : "text-gray-400"}>
                  {day.plannedBodyPartLabel} {day.log?.strengthCompleted ? "✓" : ""}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}
