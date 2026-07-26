import { createClient } from '@/lib/supabase/server';
import { STORAGE_BUCKETS, getPublicUrl } from '@/lib/supabase/storage';

export async function uploadFileToStorage(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string,
  fileBuffer: Buffer,
  contentType: string
) {
  const supabase = await createClient();
  const bucketName = STORAGE_BUCKETS[bucket];

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(path, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`Storage upload error [${bucketName}]:`, error);
    return { success: false, error: error.message };
  }

  const publicUrl = getPublicUrl(bucketName, path);
  return { success: true, path: data.path, publicUrl };
}

export async function getStorageSignedUrl(
  bucket: keyof typeof STORAGE_BUCKETS,
  path: string,
  expiresInSeconds: number = 3600
) {
  const supabase = await createClient();
  const bucketName = STORAGE_BUCKETS[bucket];

  const { data, error } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(path, expiresInSeconds);

  if (error) {
    console.error(`Signed URL generation error [${bucketName}]:`, error);
    return { success: false, error: error.message };
  }

  return { success: true, signedUrl: data.signedUrl };
}
