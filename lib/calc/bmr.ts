import type { Sex } from "@/types";

/** Mifflin-St Jeor 式で基礎代謝量(kcal/日)を算出 */
export function calcBmr(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex,
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "MALE" ? base + 5 : base - 161;
}
