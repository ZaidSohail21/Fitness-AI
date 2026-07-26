// src/lib/validation/progressImage.ts
import { z } from "zod";

export const uploadProgressImageSchema = z.object({
  description: z.string().optional(),
});

export const listProgressImageQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  take: z.coerce.number().int().min(1).max(100).default(10),
});
