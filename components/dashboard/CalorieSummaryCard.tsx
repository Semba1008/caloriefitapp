import { Card } from "@/components/ui/Card";
import { DailyLogForm } from "@/components/forms/DailyLogForm";
import { GOAL_LABEL } from "@/lib/calc/target";
import type { Goal } from "@/types";

export function CalorieSummaryCard({
  caloriesIn,
  bmr,
  tdee,
  targetBurnKcal,
  goal,
}: {
  caloriesIn?: number;
  bmr?: number;
  tdee?: number;
  targetBurnKcal?: number;
  goal: Goal;
}) {
  return (
    <Card title="本日のカロリー">
      <DailyLogForm defaultCaloriesIn={caloriesIn} />

      {bmr != null && tdee != null && targetBurnKcal != null && (
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 p-3.5 ring-1 ring-slate-900/5">
            <dt className="text-xs text-slate-500">基礎代謝 (BMR)</dt>
            <dd className="mt-1 text-lg font-bold text-slate-900">{Math.round(bmr)} kcal</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-3.5 ring-1 ring-slate-900/5">
            <dt className="text-xs text-slate-500">総消費カロリー (TDEE)</dt>
            <dd className="mt-1 text-lg font-bold text-slate-900">{Math.round(tdee)} kcal</dd>
          </div>
          <div className="col-span-2 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 p-4 text-white shadow-sm shadow-indigo-600/20">
            <dt className="text-xs font-medium text-indigo-100">
              本日の追加運動目標（目標: {GOAL_LABEL[goal]}）
            </dt>
            <dd className="mt-1 text-2xl font-bold">
              {targetBurnKcal > 0 ? `${targetBurnKcal} kcal` : "追加の運動は不要です"}
            </dd>
          </div>
        </dl>
      )}
    </Card>
  );
}
