import type { BodyPart } from "@/types";

export const BODY_PART_LABEL: Record<BodyPart, string> = {
  CHEST: "胸",
  BACK: "背中",
  LEGS: "脚",
  SHOULDERS: "肩",
  ARMS: "腕",
  PUSH: "プッシュ（胸・肩・三頭）",
  PULL: "プル（背中・二頭）",
  SHOULDERS_ARMS: "肩・腕",
  REST: "休養日",
};

/** 部位ごとの種目リスト（優先順位順）。休養日(REST)は種目を持たない */
export const EXERCISE_DB: Partial<Record<BodyPart, string[]>> = {
  CHEST: ["ベンチプレス", "インクラインダンベルプレス", "腕立て伏せ", "ケーブルフライ"],
  BACK: ["ラットプルダウン", "シーテッドケーブルロー", "デッドリフト", "ワンハンドダンベルロー"],
  LEGS: ["バックスクワット", "レッグプレス", "ウォーキングランジ", "レッグカール"],
  SHOULDERS: ["オーバーヘッドプレス", "サイドレイズ", "リアデルトフライ"],
  ARMS: ["バーベルカール", "トライセプスプッシュダウン", "ハンマーカール"],
};

export const CORE_EXERCISES = ["プランク", "ハンギングレッグレイズ", "ケーブルクランチ"];

/** 3日/4日分割で使う複合部位を、基礎部位の種目を合成して構成 */
export function exercisesForBodyPart(bodyPart: BodyPart): string[] {
  switch (bodyPart) {
    case "PUSH":
      return [
        ...(EXERCISE_DB.CHEST ?? []).slice(0, 2),
        ...(EXERCISE_DB.SHOULDERS ?? []).slice(0, 1),
        ...(EXERCISE_DB.ARMS ?? []).slice(0, 1),
      ];
    case "PULL":
      return [
        ...(EXERCISE_DB.BACK ?? []).slice(0, 3),
        ...(EXERCISE_DB.ARMS ?? []).slice(1, 2),
      ];
    case "SHOULDERS_ARMS":
      return [...(EXERCISE_DB.SHOULDERS ?? []), ...(EXERCISE_DB.ARMS ?? [])];
    case "REST":
      return [];
    default:
      return EXERCISE_DB[bodyPart] ?? [];
  }
}
