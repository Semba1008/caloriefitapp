import Link from "next/link";
import { addMonths, formatMonthParam } from "@/lib/date";
import type { HistoryDay, HistorySummary } from "@/actions/history.actions";

const WEEKDAY_HEADER = ["月", "火", "水", "木", "金", "土", "日"];

function mondayIndex(date: Date): number {
  const day = date.getUTCDay(); // 0=日曜
  return day === 0 ? 6 : day - 1;
}

export function MonthView({
  monthStart,
  days,
  summary,
}: {
  monthStart: Date;
  days: HistoryDay[];
  summary: HistorySummary;
}) {
  const leadingPad = mondayIndex(days[0].date);
  const trailingPad = (7 - ((leadingPad + days.length) % 7)) % 7;
  const prevMonth = formatMonthParam(addMonths(monthStart, -1));
  const nextMonth = formatMonthParam(addMonths(monthStart, 1));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/history/month?month=${prevMonth}`}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          ← 前の月
        </Link>
        <p className="text-sm font-medium text-gray-700">
          {monthStart.getUTCFullYear()}年{monthStart.getUTCMonth() + 1}月
        </p>
        <Link
          href={`/history/month?month=${nextMonth}`}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          次の月 →
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

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
        {WEEKDAY_HEADER.map((label) => (
          <div key={label} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: leadingPad }).map((_, i) => (
          <div key={`lead-${i}`} className="min-h-20 rounded-md bg-gray-50" />
        ))}
        {days.map((day) => (
          <DayCell key={day.date.toISOString()} day={day} />
        ))}
        {Array.from({ length: trailingPad }).map((_, i) => (
          <div key={`trail-${i}`} className="min-h-20 rounded-md bg-gray-50" />
        ))}
      </div>
    </div>
  );
}

function DayCell({ day }: { day: HistoryDay }) {
  return (
    <div className="min-h-20 rounded-md border border-gray-200 bg-white p-1.5 text-left">
      <p className="text-xs font-medium text-gray-700">{day.date.getUTCDate()}</p>
      {day.log && (
        <p className="mt-1 text-[11px] text-gray-600">{day.log.caloriesIn}kcal</p>
      )}
      {!day.isRestDay && day.isFuture && (
        <p className="mt-0.5 text-[11px] text-gray-400">予定</p>
      )}
      {!day.isRestDay && !day.isFuture && (
        <p className={`mt-0.5 text-[11px] ${day.log?.strengthCompleted ? "text-green-600" : "text-gray-400"}`}>
          {day.log?.strengthCompleted ? "✓ 完了" : "未完了"}
        </p>
      )}
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
