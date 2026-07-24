export type Sex = "MALE" | "FEMALE";
export type ActivityLevel =
  | "SEDENTARY"
  | "LIGHT"
  | "MODERATE"
  | "ACTIVE"
  | "VERY_ACTIVE";
export type Goal = "LOSE" | "MAINTAIN" | "GAIN";
export type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type BodyPart =
  | "CHEST"
  | "BACK"
  | "LEGS"
  | "SHOULDERS"
  | "ARMS"
  | "PUSH"
  | "PULL"
  | "SHOULDERS_ARMS"
  | "REST";

export interface UserProfile {
  heightCm: number;
  weightKg: number;
  age: number;
  sex: Sex;
  activityLevel: ActivityLevel;
  goal: Goal;
  trainingFrequency: number;
  experienceLevel: ExperienceLevel;
}

export interface ExerciseEntry {
  name: string;
  sets: number;
  reps: string;
}

export interface DayPlan {
  dayOfWeek: number; // 0=日曜 ... 6=土曜
  bodyPart: BodyPart;
  bodyPartLabel: string;
  exercises: ExerciseEntry[];
}

export interface CardioPreset {
  level: "EASY" | "MODERATE" | "HARD";
  label: string;
  speedKmh: number;
  inclinePct: number;
  durationMin: number;
  capped: boolean;
}
