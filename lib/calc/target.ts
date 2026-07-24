import type { Goal } from "@/types";

/**
 * 目標別の1日あたり調整カロリー(kcal)。
 * LOSE: 週あたり約0.5kg減の目安として+500kcal分を追加で消費する目標を設定
 * GAIN: 除脂肪での増量を想定した-300kcal(消費を減らしてよい)分の余裕
 */
export const GOAL_ADJUSTMENT_KCAL: Record<Goal, number> = {
  LOSE: 500,
  MAINTAIN: 0,
  GAIN: -300,
};

export const GOAL_LABEL: Record<Goal, string> = {
  LOSE: "減量",
  MAINTAIN: "維持",
  GAIN: "増量",
};

/**
 * 摂取カロリーと目標から、本日追加で運動して消費すべきカロリー(kcal)を算出。
 * 摂取カロリーがTDEE+目標調整分を既に下回っている場合は0(追加の運動不要)。
 */
export function calcTargetBurnKcal(
  caloriesIn: number,
  tdee: number,
  goal: Goal,
): number {
  const raw = caloriesIn - tdee + GOAL_ADJUSTMENT_KCAL[goal];
  return Math.max(0, Math.round(raw));
}
