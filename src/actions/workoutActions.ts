// src/actions/workoutActions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { createWorkoutSchema, updateWorkoutSchema, listWorkoutQuerySchema } from '@/lib/validation/workout';

interface ListResult<T> {
  data: T[];
  total: number;
  page: number;
  take: number;
}

export async function createWorkout(input: any): Promise<any> {
  const parsed = createWorkoutSchema.parse(input);
  // Expect caller to provide userId in the input (e.g., from Supabase session)
  const data = { ...parsed, userId: (input as any).userId };
  const workout = await prisma.workout.create({ data });
  return { success: true, data: workout };
}

export async function updateWorkout(id: string, input: any): Promise<any> {
  const parsed = updateWorkoutSchema.parse(input);
  const workout = await prisma.workout.update({ where: { id }, data: parsed });
  return { success: true, data: workout };
}

export async function deleteWorkout(id: string): Promise<any> {
  await prisma.workout.delete({ where: { id } });
  return { success: true };
}

export async function getWorkout(id: string): Promise<any> {
  const workout = await prisma.workout.findUnique({ where: { id } });
  return { success: true, data: workout };
}

export async function listWorkouts(query: any): Promise<ListResult<any>> {
  const parsed = listWorkoutQuerySchema.parse(query);
  const where: any = {};
  if (parsed.search) where.title = { contains: parsed.search, mode: 'insensitive' };
  if (parsed.status) where.status = parsed.status;
  if (parsed.visibility) where.visibility = parsed.visibility;
  if (parsed.dateFrom || parsed.dateTo) {
    where.date = {};
    if (parsed.dateFrom) where.date.gte = parsed.dateFrom;
    if (parsed.dateTo) where.date.lte = parsed.dateTo;
  }
  const total = await prisma.workout.count({ where });
  const data = await prisma.workout.findMany({
    where,
    orderBy: parsed.sort === 'date_desc' ? { date: 'desc' } : { date: 'asc' },
    skip: (parsed.page - 1) * parsed.take,
    take: parsed.take,
  });
  return { data, total, page: parsed.page, take: parsed.take };
}
