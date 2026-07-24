import { Card } from "@/components/ui/Card";
import { StrengthCompleteToggle } from "@/components/dashboard/StrengthCompleteToggle";
import type { DayPlan } from "@/types";

export function StrengthMenuCard({
  plan,
  completed,
  hasLog,
}: {
  plan: DayPlan;
  completed: boolean;
  hasLog: boolean;
}) {
  const isRest = plan.bodyPart === "REST";

  return (
    <Card title={`本日の筋トレ: ${plan.bodyPartLabel}`}>
      {isRest ? (
        <p className="text-sm text-gray-600">今日は休養日です。しっかり休んで回復させましょう。</p>
      ) : (
        <>
          <ul className="space-y-2">
            {plan.exercises.map((ex) => (
              <li
                key={ex.name}
                className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
              >
                <span className="font-medium text-gray-800">{ex.name}</span>
                <span className="text-gray-500">
                  {ex.sets}セット × {ex.reps}回
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            {hasLog ? (
              <StrengthCompleteToggle completed={completed} />
            ) : (
              <p className="text-xs text-gray-500">
                摂取カロリーを記録すると完了チェックができます。
              </p>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
