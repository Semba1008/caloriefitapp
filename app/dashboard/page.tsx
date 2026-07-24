import { requireOnboardedUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { todayDateOnly, weekdayLabel } from "@/lib/date";
import { calcCardioPresets } from "@/lib/calc/cardio";
import { getTodayPlan } from "@/lib/workout/generateWeeklyPlan";
import { Nav } from "@/components/ui/Nav";
import { CalorieSummaryCard } from "@/components/dashboard/CalorieSummaryCard";
import { CardioRecommendationCard } from "@/components/dashboard/CardioRecommendationCard";
import { StrengthMenuCard } from "@/components/dashboard/StrengthMenuCard";

export default async function DashboardPage() {
  const user = await requireOnboardedUser();
  const date = todayDateOnly();

  const log = await prisma.dailyLog.findUnique({
    where: { userId_date: { userId: user.id, date } },
  });

  const plan = getTodayPlan(user.trainingFrequency, user.experienceLevel, date);
  const cardioPresets = log ? calcCardioPresets(log.targetBurnKcal, user.weightKg) : null;

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8">
        <h1 className="text-lg font-semibold text-gray-900">
          今日は{date.getUTCMonth() + 1}月{date.getUTCDate()}日（{weekdayLabel(date)}）です
        </h1>

        <CalorieSummaryCard
          caloriesIn={log?.caloriesIn}
          bmr={log?.bmr}
          tdee={log?.tdee}
          targetBurnKcal={log?.targetBurnKcal}
          goal={user.goal}
        />

        <CardioRecommendationCard presets={cardioPresets} />

        <StrengthMenuCard plan={plan} completed={log?.strengthCompleted ?? false} hasLog={!!log} />
      </main>
    </div>
  );
}
