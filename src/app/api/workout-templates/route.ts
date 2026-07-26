// src/app/api/workout-templates/route.ts
import { NextResponse } from 'next/server';
import { createWorkoutTemplate, updateWorkoutTemplate, deleteWorkoutTemplate, getWorkoutTemplate, listWorkoutTemplates } from '@/actions/workoutTemplateActions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams.entries());
  const result = await listWorkoutTemplates(query);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createWorkoutTemplate(body);
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  const body = await request.json();
  const result = await updateWorkoutTemplate(id, body);
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  const result = await deleteWorkoutTemplate(id);
  return NextResponse.json(result);
}
