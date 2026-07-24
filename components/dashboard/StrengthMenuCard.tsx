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
        <p className="text-sm text-slate-600">今日は休養日です。しっかり休んで回復させましょう。</p>
      ) : (
        <>
          <ul className="space-y-1.5">
            {plan.exercises.map((ex, i) => (
              <li
                key={ex.name}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-slate-50"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                  {i + 1}
                </span>
                <span className="flex-1 font-medium text-slate-800">{ex.name}</span>
                <span className="text-slate-500">
                  {ex.sets}セット × {ex.reps}回
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-slate-100 pt-4">
            {hasLog ? (
              <StrengthCompleteToggle completed={completed} />
            ) : (
              <p className="text-xs text-slate-400">
                摂取カロリーを記録すると完了チェックができます。
              </p>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
