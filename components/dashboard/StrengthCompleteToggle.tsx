"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markStrengthComplete } from "@/actions/dailyLog.actions";

export function StrengthCompleteToggle({ completed }: { completed: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [checked, setChecked] = useState(completed);

  useEffect(() => setChecked(completed), [completed]);

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.checked;
          setChecked(next);
          startTransition(async () => {
            const result = await markStrengthComplete(next);
            if (!result.ok) {
              setChecked(completed);
              return;
            }
            router.refresh();
          });
        }}
        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
      />
      完了
    </label>
  );
}
