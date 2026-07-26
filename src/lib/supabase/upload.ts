// src/lib/supabase/upload.ts
import { createClient } from '@/lib/supabase/server';
import { STORAGE_BUCKETS } from '@/lib/supabase/storage';

/**
 * Upload a file to a Supabase storage bucket.
 * Returns the public URL of the uploaded object.
 */
export async function uploadFile(options: {
  bucket: keyof typeof STORAGE_BUCKETS;
  path: string; // path inside the bucket (e.g., "avatars/user123.png")
  file: File;
}): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(STORAGE_BUCKETS[options.bucket]).upload(options.path, options.file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    console.error('Supabase upload error:', error);
    throw error;
  }

  // data.path may contain the bucket prefix, construct public URL
  return getPublicUrl(STORAGE_BUCKETS[options.bucket], data.path);
}

function getPublicUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
