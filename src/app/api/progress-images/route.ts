// src/app/api/progress-images/route.ts
import { NextResponse } from 'next/server';
import { uploadProgressImage, listProgressImages } from '@/actions/progressImageActions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams.entries());
  // Assume userId is passed as a query param (e.g., from middleware auth)
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ success: false, error: 'Missing userId' }, { status: 400 });
  const result = await listProgressImages(query, userId);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  // Expect multipart/form-data with file and optional description
  const form = await request.formData();
  const file = form.get('file');
  const description = form.get('description')?.toString();
  const userId = form.get('userId')?.toString();
  if (!(file instanceof File) || !userId) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
  const result = await uploadProgressImage(file, description, userId);
  return NextResponse.json(result);
}
