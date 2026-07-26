// src/actions/exerciseActions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { createExerciseSchema, updateExerciseSchema, listExerciseQuerySchema } from '@/lib/validation/exercise';

interface ListResult<T> {
  data: T[];
  total: number;
  page: number;
  take: number;
}

export async function createExercise(input: any): Promise<any> {
  const parsed = createExerciseSchema.parse(input);
  const exercise = await prisma.exercise.create({ data: parsed });
  return { success: true, data: exercise };
}

export async function updateExercise(id: string, input: any): Promise<any> {
  const parsed = updateExerciseSchema.parse(input);
  const exercise = await prisma.exercise.update({ where: { id }, data: parsed });
  return { success: true, data: exercise };
}

export async function deleteExercise(id: string): Promise<any> {
  await prisma.exercise.delete({ where: { id } });
  return { success: true };
}

export async function getExercise(id: string): Promise<any> {
  const exercise = await prisma.exercise.findUnique({ where: { id } });
  return { success: true, data: exercise };
}

export async function listExercises(query: any): Promise<ListResult<any>> {
  const parsed = listExerciseQuerySchema.parse(query);
  const where: any = {};
  if (parsed.search) where.name = { contains: parsed.search, mode: 'insensitive' };
  if (parsed.category) where.category = parsed.category;
  if (parsed.muscleGroup) where.muscleGroup = parsed.muscleGroup;

  const total = await prisma.exercise.count({ where });
  const data = await prisma.exercise.findMany({
    where,
    orderBy: parsed.sort === 'name_desc' ? { name: 'desc' } : { name: 'asc' },
    skip: (parsed.page - 1) * parsed.take,
    take: parsed.take,
  });
  return { data, total, page: parsed.page, take: parsed.take };
}
