// src/lib/validation/workout.ts
import { z } from "zod";
import { WorkoutStatus, Visibility } from "@prisma/client";

export const createWorkoutSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  notes: z.string().optional(),
  status: z.nativeEnum(WorkoutStatus).default("Planned"),
  durationMinutes: z.coerce.number().int().positive().optional(),
  caloriesBurned: z.coerce.number().int().nonnegative().optional(),
  visibility: z.nativeEnum(Visibility).default("Private"),
});

export const updateWorkoutSchema = createWorkoutSchema.partial();

export const listWorkoutQuerySchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(WorkoutStatus).optional(),
  visibility: z.nativeEnum(Visibility).optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  take: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(["date_desc", "date_asc"]).optional(),
});
