// src/actions/goalActions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { createGoalSchema, updateGoalSchema, listGoalQuerySchema } from '@/lib/validation/goal';
import { createClient } from '@/lib/supabase/client';

interface ListResult<T> {
  data: T[];
  total: number;
  page: number;
  take: number;
}

export async function createGoal(input: any): Promise<any> {
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  const userId = authData.user?.id;
  if (!userId) throw new Error('User not authenticated');
  // userId is required for Goal; ensure it's included
  const parsed = createGoalSchema.parse({ ...input, userId });
  const goal = await prisma.goal.create({ data: parsed as any });
  return { success: true, data: goal };
}

export async function updateGoal(id: string, input: any): Promise<any> {
  const parsed = updateGoalSchema.parse(input);
  const goal = await prisma.goal.update({ where: { id }, data: parsed });
  return { success: true, data: goal };
}

export async function deleteGoal(id: string): Promise<any> {
  await prisma.goal.delete({ where: { id } });
  return { success: true };
}

export async function getGoal(id: string): Promise<any> {
  const goal = await prisma.goal.findUnique({ where: { id } });
  return { success: true, data: goal };
}

export async function listGoals(query: any): Promise<ListResult<any>> {
  const parsed = listGoalQuerySchema.parse(query);
  const where: any = {};
  if (parsed.type) where.type = parsed.type;
  if (parsed.unit) where.unit = parsed.unit;
  const total = await prisma.goal.count({ where });
  const data = await prisma.goal.findMany({
    where,
    skip: (parsed.page - 1) * parsed.take,
    take: parsed.take,
    orderBy: { createdAt: 'desc' },
  });
  return { data, total, page: parsed.page, take: parsed.take };
}
