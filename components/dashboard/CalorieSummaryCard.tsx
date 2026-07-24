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
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-gray-50 p-3">
            <dt className="text-gray-500">基礎代謝 (BMR)</dt>
            <dd className="text-lg font-semibold text-gray-900">{Math.round(bmr)} kcal</dd>
          </div>
          <div className="rounded-md bg-gray-50 p-3">
            <dt className="text-gray-500">総消費カロリー (TDEE)</dt>
            <dd className="text-lg font-semibold text-gray-900">{Math.round(tdee)} kcal</dd>
          </div>
          <div className="col-span-2 rounded-md bg-blue-50 p-3">
            <dt className="text-blue-700">
              本日の追加運動目標（目標: {GOAL_LABEL[goal]}）
            </dt>
            <dd className="text-2xl font-bold text-blue-900">
              {targetBurnKcal > 0 ? `${targetBurnKcal} kcal` : "追加の運動は不要です"}
            </dd>
          </div>
        </dl>
      )}
    </Card>
  );
}
