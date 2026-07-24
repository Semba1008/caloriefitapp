-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "heightCm" REAL,
    "weightKg" REAL,
    "age" INTEGER,
    "sex" TEXT,
    "activityLevel" TEXT,
    "goal" TEXT NOT NULL DEFAULT 'MAINTAIN',
    "trainingFrequency" INTEGER NOT NULL DEFAULT 3,
    "experienceLevel" TEXT NOT NULL DEFAULT 'BEGINNER'
);

-- CreateTable
CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "caloriesIn" INTEGER NOT NULL,
    "bmr" REAL NOT NULL,
    "tdee" REAL NOT NULL,
    "targetBurnKcal" REAL NOT NULL,
    "cardioMinutes" REAL,
    "cardioInclinePct" REAL,
    "cardioSpeedKmh" REAL,
    "strengthBodyPart" TEXT,
    "strengthExercises" TEXT,
    "strengthCompleted" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "DailyLog_userId_date_idx" ON "DailyLog"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyLog_userId_date_key" ON "DailyLog"("userId", "date");
