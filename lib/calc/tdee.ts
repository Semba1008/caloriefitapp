import type { ActivityLevel } from "@/types";

export const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  SEDENTARY: 1.2,
  LIGHT: 1.375,
  MODERATE: 1.55,
  ACTIVE: 1.725,
  VERY_ACTIVE: 1.9,
};

export const ACTIVITY_LEVEL_LABEL: Record<ActivityLevel, string> = {
  SEDENTARY: "座位中心（ほとんど運動しない）",
  LIGHT: "軽い活動（週1-3日の運動）",
  MODERATE: "普通の活動（週3-5日の運動）",
  ACTIVE: "活発（週6-7日の運動）",
  VERY_ACTIVE: "非常に活発（毎日の激しい運動・体力労働）",
};

/** 基礎代謝(BMR)に活動係数を掛けて総消費カロリー(TDEE)を算出 */
export function calcTdee(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIER[activityLevel];
}
