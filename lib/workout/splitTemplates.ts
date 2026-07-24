import type { BodyPart } from "@/types";

/** dayOfWeek: 0=日曜 ... 6=土曜。トレーニング頻度(3/4/5日)ごとの曜日→部位テンプレート */
export const SPLIT_TEMPLATES: Record<number, BodyPart[]> = {
  3: ["REST", "PUSH", "REST", "PULL", "REST", "LEGS", "REST"],
  4: ["REST", "CHEST", "BACK", "REST", "LEGS", "SHOULDERS_ARMS", "REST"],
  5: ["REST", "CHEST", "BACK", "LEGS", "SHOULDERS", "ARMS", "REST"],
};

export function getSplitTemplate(trainingFrequency: number): BodyPart[] {
  return SPLIT_TEMPLATES[trainingFrequency] ?? SPLIT_TEMPLATES[3];
}
