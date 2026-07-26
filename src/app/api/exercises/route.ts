// src/app/api/exercises/route.ts
import { NextResponse } from 'next/server';
import { createExercise, updateExercise, deleteExercise, getExercise, listExercises } from '@/actions/exerciseActions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams.entries());
  const result = await listExercises(query);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createExercise(body);
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  const body = await request.json();
  const result = await updateExercise(id, body);
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  const result = await deleteExercise(id);
  return NextResponse.json(result);
}
