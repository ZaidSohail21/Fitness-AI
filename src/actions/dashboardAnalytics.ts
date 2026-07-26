// src/actions/dashboardAnalytics.ts
"use server";

import { prisma } from '@/lib/prisma';
import { subDays, startOfDay } from 'date-fns';

interface Analytics {
  totalWorkouts: number;
  weeklySessions: number;
  totalVolumeLifted: number;
  currentStreak: number;
  goalsCompleted: number;
}

export async function getDashboardAnalytics(userId: string): Promise<Analytics> {
  // Total workouts
  const totalWorkouts = await prisma.workout.count({ where: { userId } });

  // Weekly sessions (last 7 days inclusive)
  const weekStart = startOfDay(subDays(new Date(), 6));
  const weeklySessions = await prisma.workout.count({
    where: { userId, date: { gte: weekStart } },
  });

  // Total volume lifted (weight * sets) for completed exercises
  const exercises = await prisma.workoutExercise.findMany({
    where: { workout: { userId } },
    select: { weight: true, sets: true },
  });
  const totalVolumeLifted = exercises.reduce(
    (sum, e) => (e.weight && e.sets ? sum + e.weight * e.sets : sum),
    0,
  );

  // Current streak (consecutive days with a workout up to today)
  const today = startOfDay(new Date());
  const past30 = await prisma.workout.findMany({
    where: { userId, date: { gte: subDays(today, 30) } },
    select: { date: true },
    orderBy: { date: 'desc' },
  });
  const workoutDays = past30.map((w) => startOfDay(w.date).getTime());
  let streak = 0;
  for (let i = 0; i <= 30; i++) {
    const day = startOfDay(subDays(today, i)).getTime();
    if (workoutDays.includes(day)) {
      streak++;
    } else {
      break;
    }
  }

  // Goals completed
  const goals = await prisma.goal.findMany({ where: { userId } });
  const goalsCompleted = goals.filter((g) => (g.currentValue ?? 0) >= g.targetValue).length;

  return {
    totalWorkouts,
    weeklySessions,
    totalVolumeLifted,
    currentStreak: streak,
    goalsCompleted,
  };
}
