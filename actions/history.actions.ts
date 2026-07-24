import { prisma } from "@/lib/prisma";
import { generateWeeklyPlan } from "@/lib/workout/generateWeeklyPlan";
import {
  addDays,
  endOfMonthDate,
  formatDateParam,
  startOfMonthDate,
  startOfWeekMonday,
  todayDateOnly,
} from "@/lib/date";
import type { ExperienceLevel } from "@/types";

export interface HistoryDay {
  date: Date;
  log: {
    caloriesIn: number;
    targetBurnKcal: number;
    strengthCompleted: boolean;
  } | null;
  plannedBodyPartLabel: string;
  isRestDay: boolean;
  isFuture: boolean;
}

export interface HistorySummary {
  totalCaloriesIn: number;
  avgCaloriesIn: number;
  totalTargetBurnKcal: number;
  loggedDays: number;
  strengthAdherence: number; // 0-1
}

function summarize(days: HistoryDay[]): HistorySummary {
  const logged = days.filter((d) => d.log);
  const totalCaloriesIn = logged.reduce((sum, d) => sum + (d.log?.caloriesIn ?? 0), 0);
  const totalTargetBurnKcal = logged.reduce((sum, d) => sum + (d.log?.targetBurnKcal ?? 0), 0);
  // 未来の日はまだ「未達成」と判定できないため、達成率の対象から除外する
  const scheduledNonRestDays = days.filter((d) => !d.isRestDay && !d.isFuture);
  const completedDays = scheduledNonRestDays.filter((d) => d.log?.strengthCompleted);

  return {
    totalCaloriesIn,
    avgCaloriesIn: logged.length > 0 ? Math.round(totalCaloriesIn / logged.length) : 0,
    totalTargetBurnKcal: Math.round(totalTargetBurnKcal),
    loggedDays: logged.length,
    strengthAdherence:
      scheduledNonRestDays.length > 0 ? completedDays.length / scheduledNonRestDays.length : 0,
  };
}

async function buildHistoryDays(
  userId: string,
  start: Date,
  end: Date,
  trainingFrequency: number,
  experienceLevel: ExperienceLevel,
): Promise<HistoryDay[]> {
  const logs = await prisma.dailyLog.findMany({
    where: { userId, date: { gte: start, lte: end } },
    orderBy: { date: "asc" },
  });
  const logsByDate = new Map(logs.map((log) => [formatDateParam(log.date), log]));
  const weeklyPlan = generateWeeklyPlan(trainingFrequency, experienceLevel);
  const today = todayDateOnly();

  const days: HistoryDay[] = [];
  let cursor = start;
  while (cursor <= end) {
    const log = logsByDate.get(formatDateParam(cursor));
    const planned = weeklyPlan[cursor.getUTCDay()];
    days.push({
      date: cursor,
      log: log
        ? {
            caloriesIn: log.caloriesIn,
            targetBurnKcal: log.targetBurnKcal,
            strengthCompleted: log.strengthCompleted,
          }
        : null,
      plannedBodyPartLabel: planned.bodyPartLabel,
      isRestDay: planned.bodyPart === "REST",
      isFuture: cursor > today,
    });
    cursor = addDays(cursor, 1);
  }
  return days;
}

export async function getWeekHistory(
  userId: string,
  anyDateInWeek: Date,
  trainingFrequency: number,
  experienceLevel: ExperienceLevel,
) {
  const start = startOfWeekMonday(anyDateInWeek);
  const end = addDays(start, 6);
  const days = await buildHistoryDays(userId, start, end, trainingFrequency, experienceLevel);
  return { start, end, days, summary: summarize(days) };
}

export async function getMonthHistory(
  userId: string,
  anyDateInMonth: Date,
  trainingFrequency: number,
  experienceLevel: ExperienceLevel,
) {
  const start = startOfMonthDate(anyDateInMonth);
  const end = endOfMonthDate(anyDateInMonth);
  const days = await buildHistoryDays(userId, start, end, trainingFrequency, experienceLevel);
  return { start, end, days, summary: summarize(days) };
}
