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
      <div className="mb-5 flex items-center justify-between">
        <Link
          href={`/history/week?weekStart=${prevWeekStart}`}
          className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-900/5 transition hover:bg-slate-50"
        >
          ← 前の週
        </Link>
        <p className="text-sm font-semibold text-slate-700">
          {formatDateParam(start)} 〜 {formatDateParam(end)}
        </p>
        <Link
          href={`/history/week?weekStart=${nextWeekStart}`}
          className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-900/5 transition hover:bg-slate-50"
        >
          次の週 →
        </Link>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
            className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-900/5"
          >
            <div className="w-24 text-sm font-semibold text-slate-700">
              {day.date.getUTCMonth() + 1}/{day.date.getUTCDate()} ({weekdayLabel(day.date)})
            </div>
            <div className="flex-1 text-sm text-slate-500">
              {day.log ? (
                <>
                  摂取 {day.log.caloriesIn} kcal ・ 運動目標 {day.log.targetBurnKcal} kcal
                </>
              ) : (
                <span className="text-slate-300">未記録</span>
              )}
            </div>
            <div className="w-32 text-right text-sm">
              {day.isRestDay ? (
                <span className="text-slate-300">休養日</span>
              ) : (
                <span
                  className={
                    day.log?.strengthCompleted
                      ? "inline-flex items-center gap-1 font-medium text-emerald-600"
                      : "text-slate-400"
                  }
                >
                  {day.plannedBodyPartLabel}
                  {day.log?.strengthCompleted && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
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
    <div className="rounded-xl bg-white p-3.5 text-center shadow-sm ring-1 ring-slate-900/5">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}
