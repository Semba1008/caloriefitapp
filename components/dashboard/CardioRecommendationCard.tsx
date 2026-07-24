import { Card } from "@/components/ui/Card";
import type { CardioPreset } from "@/types";

const LEVEL_ORDER: CardioPreset["level"][] = ["EASY", "MODERATE", "HARD"];

export function CardioRecommendationCard({ presets }: { presets: CardioPreset[] | null }) {
  if (!presets) {
    return (
      <Card title="有酸素運動（傾斜ウォーキング）">
        <p className="text-sm text-gray-500">
          本日の摂取カロリーを記録すると、推奨のウォーキング時間が表示されます。
        </p>
      </Card>
    );
  }

  return (
    <Card title="有酸素運動（傾斜ウォーキング）">
      <div className="grid grid-cols-3 gap-3">
        {LEVEL_ORDER.map((level) => {
          const preset = presets.find((p) => p.level === level)!;
          return (
            <div key={level} className="rounded-md border border-gray-200 p-3 text-center">
              <p className="text-sm font-medium text-gray-700">{preset.label}</p>
              <p className="mt-1 text-xs text-gray-500">
                速度 {preset.speedKmh}km/h ・ 傾斜 {preset.inclinePct}%
              </p>
              <p className="mt-2 text-xl font-bold text-gray-900">{preset.durationMin}分</p>
              {preset.capped && (
                <p className="mt-1 text-xs text-orange-600">60分でも目標に届かない場合あり</p>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        ※ 筋トレの消費カロリーは推定精度が低いため、この目標には含めていません。
      </p>
    </Card>
  );
}
