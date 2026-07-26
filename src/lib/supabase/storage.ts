export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  DOCUMENTS: 'documents',
  PROGRESS_IMAGES: 'progress-images',
} as const;

export interface StorageUploadOptions {
  bucket: keyof typeof STORAGE_BUCKETS;
  path: string;
  file: File;
}

export function getPublicUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
