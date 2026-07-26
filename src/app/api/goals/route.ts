// src/app/api/goals/route.ts
import { NextResponse } from 'next/server';
import { createGoal, updateGoal, deleteGoal, getGoal, listGoals } from '@/actions/goalActions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = Object.fromEntries(searchParams.entries());
  const result = await listGoals(query);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createGoal(body);
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  const body = await request.json();
  const result = await updateGoal(id, body);
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  const result = await deleteGoal(id);
  return NextResponse.json(result);
}
