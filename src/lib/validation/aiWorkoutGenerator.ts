import { z } from 'zod';

export const aiWorkoutInputSchema = z.object({
  goal: z.enum(['Build Muscle', 'Lose Weight', 'Maintain Fitness']),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  daysPerWeek: z.coerce.number().int().min(3).max(6),
});

export type AiWorkoutInput = z.infer<typeof aiWorkoutInputSchema>;
