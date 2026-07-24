"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

const profileSchema = z.object({
  heightCm: z.coerce.number().min(50).max(300),
  weightKg: z.coerce.number().min(20).max(400),
  age: z.coerce.number().int().min(10).max(120),
  sex: z.enum(["MALE", "FEMALE"]),
  activityLevel: z.enum(["SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "VERY_ACTIVE"]),
  goal: z.enum(["LOSE", "MAINTAIN", "GAIN"]),
  trainingFrequency: z.coerce.number().int().min(3).max(5),
  experienceLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
});

export type ProfileResult = { ok: true } | { ok: false; error: string };

export async function saveProfile(
  _prevState: ProfileResult | undefined,
  formData: FormData,
): Promise<ProfileResult> {
  const user = await requireUser();

  const parsed = profileSchema.safeParse({
    heightCm: formData.get("heightCm"),
    weightKg: formData.get("weightKg"),
    age: formData.get("age"),
    sex: formData.get("sex"),
    activityLevel: formData.get("activityLevel"),
    goal: formData.get("goal"),
    trainingFrequency: formData.get("trainingFrequency"),
    experienceLevel: formData.get("experienceLevel"),
  });

  if (!parsed.success) {
    return { ok: false, error: "入力内容を確認してください" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: parsed.data,
  });

  redirect("/dashboard");
}
