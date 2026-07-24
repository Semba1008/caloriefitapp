"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireOnboardedUser } from "@/lib/session";
import { calcBmr } from "@/lib/calc/bmr";
import { calcTdee } from "@/lib/calc/tdee";
import { calcTargetBurnKcal } from "@/lib/calc/target";
import { calcCardioPresets } from "@/lib/calc/cardio";
import { getTodayPlan } from "@/lib/workout/generateWeeklyPlan";
import { todayDateOnly } from "@/lib/date";

const logSchema = z.object({
  caloriesIn: z.coerce.number().int().min(0).max(20000),
});

export type DailyLogResult = { ok: true } | { ok: false; error: string };

export async function upsertDailyLog(
  _prevState: DailyLogResult | undefined,
  formData: FormData,
): Promise<DailyLogResult> {
  const user = await requireOnboardedUser();

  const parsed = logSchema.safeParse({ caloriesIn: formData.get("caloriesIn") });
  if (!parsed.success) {
    return { ok: false, error: "摂取カロリーを正しく入力してください" };
  }

  const date = todayDateOnly();
  const bmr = calcBmr(user.weightKg, user.heightCm, user.age, user.sex);
  const tdee = calcTdee(bmr, user.activityLevel);
  const targetBurnKcal = calcTargetBurnKcal(parsed.data.caloriesIn, tdee, user.goal);
  const cardioPresets = calcCardioPresets(targetBurnKcal, user.weightKg);
  const moderate = cardioPresets.find((p) => p.level === "MODERATE")!;
  const dayPlan = getTodayPlan(user.trainingFrequency, user.experienceLevel, date);

  await prisma.dailyLog.upsert({
    where: { userId_date: { userId: user.id, date } },
    create: {
      userId: user.id,
      date,
      caloriesIn: parsed.data.caloriesIn,
      bmr,
      tdee,
      targetBurnKcal,
      cardioMinutes: moderate.durationMin,
      cardioInclinePct: moderate.inclinePct,
      cardioSpeedKmh: moderate.speedKmh,
      strengthBodyPart: dayPlan.bodyPart,
      strengthExercises: JSON.stringify(dayPlan.exercises),
    },
    update: {
      caloriesIn: parsed.data.caloriesIn,
      bmr,
      tdee,
      targetBurnKcal,
      cardioMinutes: moderate.durationMin,
      cardioInclinePct: moderate.inclinePct,
      cardioSpeedKmh: moderate.speedKmh,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/history/week");
  revalidatePath("/history/month");
  return { ok: true };
}

export async function markStrengthComplete(completed: boolean): Promise<DailyLogResult> {
  const user = await requireOnboardedUser();
  const date = todayDateOnly();

  const existing = await prisma.dailyLog.findUnique({
    where: { userId_date: { userId: user.id, date } },
  });
  if (!existing) {
    return { ok: false, error: "先に本日の摂取カロリーを記録してください" };
  }

  await prisma.dailyLog.update({
    where: { userId_date: { userId: user.id, date } },
    data: { strengthCompleted: completed },
  });

  revalidatePath("/dashboard");
  revalidatePath("/history/week");
  revalidatePath("/history/month");
  return { ok: true };
}
