"use client";

import { useActionState } from "react";
import { saveProfile, type ProfileResult } from "@/actions/profile.actions";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ACTIVITY_LEVEL_LABEL } from "@/lib/calc/tdee";
import { GOAL_LABEL } from "@/lib/calc/target";
import type { ActivityLevel, ExperienceLevel, Goal, Sex } from "@/types";

interface Defaults {
  heightCm?: number | null;
  weightKg?: number | null;
  age?: number | null;
  sex?: Sex | null;
  activityLevel?: ActivityLevel | null;
  goal?: Goal;
  trainingFrequency?: number;
  experienceLevel?: ExperienceLevel;
}

const EXPERIENCE_LABEL: Record<ExperienceLevel, string> = {
  BEGINNER: "初級（トレーニング歴1年未満）",
  INTERMEDIATE: "中級（トレーニング歴1〜3年）",
  ADVANCED: "上級（トレーニング歴3年以上）",
};

export function ProfileForm({ defaults, submitLabel }: { defaults: Defaults; submitLabel: string }) {
  const [state, formAction, isPending] = useActionState<ProfileResult | undefined, FormData>(
    saveProfile,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state && !state.ok && (
        <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{state.error}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="heightCm">身長 (cm)</Label>
          <Input
            id="heightCm"
            name="heightCm"
            type="number"
            step="0.1"
            required
            defaultValue={defaults.heightCm ?? undefined}
          />
        </div>
        <div>
          <Label htmlFor="weightKg">体重 (kg)</Label>
          <Input
            id="weightKg"
            name="weightKg"
            type="number"
            step="0.1"
            required
            defaultValue={defaults.weightKg ?? undefined}
          />
        </div>
        <div>
          <Label htmlFor="age">年齢</Label>
          <Input id="age" name="age" type="number" required defaultValue={defaults.age ?? undefined} />
        </div>
        <div>
          <Label htmlFor="sex">性別</Label>
          <Select id="sex" name="sex" required defaultValue={defaults.sex ?? ""}>
            <option value="" disabled>
              選択してください
            </option>
            <option value="MALE">男性</option>
            <option value="FEMALE">女性</option>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="activityLevel">日常の活動レベル</Label>
        <Select id="activityLevel" name="activityLevel" required defaultValue={defaults.activityLevel ?? ""}>
          <option value="" disabled>
            選択してください
          </option>
          {Object.entries(ACTIVITY_LEVEL_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="goal">目標</Label>
        <Select id="goal" name="goal" required defaultValue={defaults.goal ?? "MAINTAIN"}>
          {Object.entries(GOAL_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="trainingFrequency">週の筋トレ頻度</Label>
          <Select
            id="trainingFrequency"
            name="trainingFrequency"
            required
            defaultValue={String(defaults.trainingFrequency ?? 3)}
          >
            <option value="3">週3日</option>
            <option value="4">週4日</option>
            <option value="5">週5日</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="experienceLevel">トレーニング経験</Label>
          <Select
            id="experienceLevel"
            name="experienceLevel"
            required
            defaultValue={defaults.experienceLevel ?? "BEGINNER"}
          >
            {Object.entries(EXPERIENCE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "保存中..." : submitLabel}
      </Button>
    </form>
  );
}
