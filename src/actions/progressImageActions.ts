// src/actions/progressImageActions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { uploadProgressImageSchema, listProgressImageQuerySchema } from '@/lib/validation/progressImage';
import { createClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

interface ListResult<T> {
  data: T[];
  total: number;
  page: number;
  take: number;
}

export async function uploadProgressImage(file: File, description?: string, userId?: string): Promise<any> {
  // Validate description
  const parsed = uploadProgressImageSchema.parse({ description });
  if (!userId) throw new Error('User ID required');

  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const bucket = 'progress-images';

  const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file, {
    upsert: false,
    contentType: file.type,
  });
  if (uploadError) throw uploadError;

  const progressImage = await prisma.progressImage.create({
    data: {
      userId,
      storagePath: `${bucket}/${fileName}`,
      description: parsed.description,
    },
  });
  return { success: true, data: progressImage };
}

export async function listProgressImages(query: any, userId?: string): Promise<ListResult<any>> {
  const parsed = listProgressImageQuerySchema.parse(query);
  if (!userId) throw new Error('User ID required');
  const where = { userId };
  const total = await prisma.progressImage.count({ where });
  const data = await prisma.progressImage.findMany({
    where,
    skip: (parsed.page - 1) * parsed.take,
    take: parsed.take,
    orderBy: { uploadedAt: 'desc' },
  });
  return { data, total, page: parsed.page, take: parsed.take };
}
