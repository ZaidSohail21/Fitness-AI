// src/app/api/workouts/route.ts
import { NextResponse } from 'next/server';
import { createWorkout, updateWorkout, deleteWorkout, getWorkout, listWorkouts } from '@/actions/workoutActions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams.entries());
  const result = await listWorkouts(query);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createWorkout(body);
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  const body = await request.json();
  const result = await updateWorkout(id, body);
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  const result = await deleteWorkout(id);
  return NextResponse.json(result);
}
