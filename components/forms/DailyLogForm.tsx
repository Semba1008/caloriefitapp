"use client";

import { useActionState } from "react";
import { upsertDailyLog, type DailyLogResult } from "@/actions/dailyLog.actions";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";

export function DailyLogForm({ defaultCaloriesIn }: { defaultCaloriesIn?: number }) {
  const [state, formAction, isPending] = useActionState<DailyLogResult | undefined, FormData>(
    upsertDailyLog,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      {state && !state.ok && (
        <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{state.error}</p>
      )}
      <div>
        <Label htmlFor="caloriesIn">本日の摂取カロリー (kcal)</Label>
        <div className="flex gap-2">
          <Input
            id="caloriesIn"
            name="caloriesIn"
            type="number"
            required
            min={0}
            defaultValue={defaultCaloriesIn}
          />
          <Button type="submit" disabled={isPending} className="shrink-0 whitespace-nowrap">
            {isPending ? "計算中..." : "記録する"}
          </Button>
        </div>
      </div>
    </form>
  );
}
