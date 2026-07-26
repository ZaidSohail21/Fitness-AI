// src/actions/progressAnalytics.ts
"use server";

import { prisma } from '@/lib/prisma';
import { startOfWeek, subDays, format } from 'date-fns';

/**
 * Returns detailed progress analytics for a user.
 * Includes weekly workout counts for the past 8 weeks,
 * recent workout history (last 20), goal progress, current streak,
 * and personal records (max weight per exercise).
 */
export async function getProgressAnalytics(userId: string) {
  // 1. Weekly workout chart (last 8 weeks)
  const today = new Date();
  const weeks: { label: string; count: number }[] = [];
  for (let i = 7; i >= 0; i--) {
    const weekStart = startOfWeek(subDays(today, i * 7), { weekStartsOn: 1 }); // Monday start
    const weekEnd = subDays(today, i * 7 - 6);
    const count = await prisma.workout.count({
      where: {
        userId,
        date: { gte: weekStart, lte: weekEnd },
      },
    });
    weeks.push({
      label: format(weekStart, 'MMM d'),
      count,
    });
  }

  // 2. Recent workout history (last 20)
  const recentWorkouts = await prisma.workout.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 20,
    select: { id: true, title: true, date: true, status: true },
  });

  // 3. Goal progress bars (already available via dashboardAnalytics, but compute here for completeness)
  const goals = await prisma.goal.findMany({
    where: { userId },
    select: { id: true, type: true, unit: true, targetValue: true, currentValue: true },
    orderBy: { createdAt: 'desc' },
  });

  // 4. Current streak (same logic as dashboardAnalytics)
  const past30 = await prisma.workout.findMany({
    where: { userId, date: { gte: subDays(today, 30) } },
    select: { date: true },
    orderBy: { date: 'desc' },
  });
  const workoutDays = past30.map(w => startOfWeek(w.date, { weekStartsOn: 1 }).getTime());
  let streak = 0;
  for (let i = 0; i <= 30; i++) {
    const day = startOfWeek(subDays(today, i), { weekStartsOn: 1 }).getTime();
    if (workoutDays.includes(day)) {
      streak++;
    } else {
      break;
    }
  }

  // 5. Personal records (max weight per exercise across completed workoutExercises)
  const records = await prisma.workoutExercise.groupBy({
    by: ['exerciseId'],
    where: { workout: { userId }, completed: true },
    _max: { weight: true },
  });
  const personalRecords = await Promise.all(
    records.map(async rec => {
      const exercise = await prisma.exercise.findUnique({ where: { id: rec.exerciseId }, select: { name: true } });
      return { exerciseId: rec.exerciseId, exerciseName: exercise?.name ?? 'Unknown', maxWeight: rec._max.weight ?? 0 };
    })
  );

  return {
    weeklyChart: weeks,
    history: recentWorkouts,
    goals,
    streak,
    personalRecords,
  };
}
