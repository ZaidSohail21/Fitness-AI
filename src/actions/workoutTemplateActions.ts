// src/actions/workoutTemplateActions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { createWorkoutTemplateSchema, updateWorkoutTemplateSchema, listWorkoutTemplateQuerySchema } from '@/lib/validation/workoutTemplate';

interface ListResult<T> {
  data: T[];
  total: number;
  page: number;
  take: number;
}

export async function createWorkoutTemplate(input: any): Promise<any> {
  const parsed = createWorkoutTemplateSchema.parse(input);
  const template = await prisma.workoutTemplate.create({ data: parsed });
  return { success: true, data: template };
}

export async function updateWorkoutTemplate(id: string, input: any): Promise<any> {
  const parsed = updateWorkoutTemplateSchema.parse(input);
  const template = await prisma.workoutTemplate.update({ where: { id }, data: parsed });
  return { success: true, data: template };
}

export async function deleteWorkoutTemplate(id: string): Promise<any> {
  await prisma.workoutTemplate.delete({ where: { id } });
  return { success: true };
}

export async function getWorkoutTemplate(id: string): Promise<any> {
  const template = await prisma.workoutTemplate.findUnique({ where: { id } });
  return { success: true, data: template };
}

export async function listWorkoutTemplates(query: any): Promise<ListResult<any>> {
  const parsed = listWorkoutTemplateQuerySchema.parse(query);
  const total = await prisma.workoutTemplate.count();
  const data = await prisma.workoutTemplate.findMany({
    skip: (parsed.page - 1) * parsed.take,
    take: parsed.take,
    orderBy: { createdAt: 'desc' },
  });
  return { data, total, page: parsed.page, take: parsed.take };
}
