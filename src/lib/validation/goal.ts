// src/lib/validation/goal.ts
import { z } from "zod";
import { GoalType, GoalUnit } from "@prisma/client";

export const createGoalSchema = z.object({
  type: z.nativeEnum(GoalType),
  unit: z.nativeEnum(GoalUnit),
  targetValue: z.coerce.number().positive(),
  deadline: z.coerce.date().optional(),
  userId: z.string().uuid().optional(),
});

export const updateGoalSchema = createGoalSchema.partial();

export const listGoalQuerySchema = z.object({
  type: z.nativeEnum(GoalType).optional(),
  unit: z.nativeEnum(GoalUnit).optional(),
  page: z.coerce.number().int().min(1).default(1),
  take: z.coerce.number().int().min(1).max(100).default(10),
});
