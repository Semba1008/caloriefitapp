import type { DayPlan, ExerciseEntry, ExperienceLevel } from "@/types";
import { BODY_PART_LABEL, CORE_EXERCISES, exercisesForBodyPart } from "./exerciseDb";
import { getSplitTemplate } from "./splitTemplates";

const EXERCISE_COUNT: Record<ExperienceLevel, number> = {
  BEGINNER: 2,
  INTERMEDIATE: 3,
  ADVANCED: 4,
};

const SETS_REPS: Record<ExperienceLevel, { sets: number; reps: string }> = {
  BEGINNER: { sets: 3, reps: "10-12" },
  INTERMEDIATE: { sets: 4, reps: "8-10" },
  ADVANCED: { sets: 5, reps: "6-10" },
};

/**
 * トレーニング頻度・経験レベルから週7日分の筋トレプランを生成する純粋関数。
 * AIやDBを使わず、静的テンプレートから決定的に組み立てる。
 */
export function generateWeeklyPlan(
  trainingFrequency: number,
  experienceLevel: ExperienceLevel,
): DayPlan[] {
  const template = getSplitTemplate(trainingFrequency);
  const { sets, reps } = SETS_REPS[experienceLevel];
  const exerciseCount = EXERCISE_COUNT[experienceLevel];

  return template.map((bodyPart, dayOfWeek) => {
    if (bodyPart === "REST") {
      return {
        dayOfWeek,
        bodyPart,
        bodyPartLabel: BODY_PART_LABEL.REST,
        exercises: [],
      };
    }

    const mainExercises = exercisesForBodyPart(bodyPart).slice(0, exerciseCount);
    const exercises: ExerciseEntry[] = [...mainExercises, ...CORE_EXERCISES.slice(0, 2)].map(
      (name) => ({ name, sets, reps }),
    );

    return {
      dayOfWeek,
      bodyPart,
      bodyPartLabel: BODY_PART_LABEL[bodyPart],
      exercises,
    };
  });
}

export function getTodayPlan(
  trainingFrequency: number,
  experienceLevel: ExperienceLevel,
  date: Date,
): DayPlan {
  const plan = generateWeeklyPlan(trainingFrequency, experienceLevel);
  return plan[date.getUTCDay()];
}
