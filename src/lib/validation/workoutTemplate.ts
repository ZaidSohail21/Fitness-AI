// src/lib/validation/workoutTemplate.ts
import { z } from "zod";

export const createWorkoutTemplateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  exercises: z.array(
    z.object({
      exerciseId: z.string().uuid(),
      sets: z.coerce.number().int().min(1),
      reps: z.coerce.number().int().min(1).optional(),
      weight: z.coerce.number().positive().optional(),
      durationSec: z.coerce.number().int().min(1).optional(),
    })
  ),
});

export const updateWorkoutTemplateSchema = createWorkoutTemplateSchema.partial();

export const listWorkoutTemplateQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  take: z.coerce.number().int().min(1).max(100).default(10),
});
