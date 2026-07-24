import type { CardioPreset } from "@/types";

const PRESETS: {
  level: CardioPreset["level"];
  label: string;
  speedKmh: number;
  inclinePct: number;
}[] = [
  { level: "EASY", label: "イージー", speedKmh: 4.0, inclinePct: 5 },
  { level: "MODERATE", label: "ふつう", speedKmh: 5.0, inclinePct: 8 },
  { level: "HARD", label: "ハード", speedKmh: 5.5, inclinePct: 12 },
];

const MIN_DURATION_MIN = 10;
const MAX_DURATION_MIN = 60;

/**
 * ACSMウォーキング代謝式で傾斜ウォーキングの所要時間を算出。
 * VO2(mL/kg/min) = 0.1*S + 1.8*S*G + 3.5  (S=速度m/分, G=傾斜率)
 * kcal/分 = VO2 * 体重kg / 200
 */
function estimateDurationMin(
  targetBurnKcal: number,
  weightKg: number,
  speedKmh: number,
  inclinePct: number,
): number {
  const speedMPerMin = (speedKmh * 1000) / 60;
  const grade = inclinePct / 100;
  const vo2 = 0.1 * speedMPerMin + 1.8 * speedMPerMin * grade + 3.5;
  const kcalPerMin = (vo2 * weightKg) / 200;
  return targetBurnKcal / kcalPerMin;
}

export function calcCardioPresets(
  targetBurnKcal: number,
  weightKg: number,
): CardioPreset[] {
  return PRESETS.map((preset) => {
    if (targetBurnKcal <= 0) {
      return { ...preset, durationMin: 0, capped: false };
    }
    const rawDuration = estimateDurationMin(
      targetBurnKcal,
      weightKg,
      preset.speedKmh,
      preset.inclinePct,
    );
    const capped = rawDuration > MAX_DURATION_MIN;
    const durationMin = Math.round(
      Math.min(MAX_DURATION_MIN, Math.max(MIN_DURATION_MIN, rawDuration)),
    );
    return { ...preset, durationMin, capped };
  });
}
