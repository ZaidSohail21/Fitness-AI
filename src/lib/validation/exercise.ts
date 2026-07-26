// src/lib/validation/exercise.ts
import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["Strength", "Cardio", "Flexibility", "Mobility"]),
  muscleGroup: z.enum([
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
    "FullBody",
  ]),
  equipment: z.enum([
    "Barbell",
    "Dumbbell",
    "Machine",
    "Bodyweight",
    "Cable",
    "Other",
  ]),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
});

export const updateExerciseSchema = createExerciseSchema.partial();

export const listExerciseQuerySchema = z.object({
  search: z.string().optional(),
  category: z.enum(["Strength", "Cardio", "Flexibility", "Mobility"]).optional(),
  muscleGroup: z.enum([
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
    "FullBody",
  ]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  take: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(["name_asc", "name_desc"]).optional(),
});
