// src/app/api/dashboard/analytics/route.ts
import { NextResponse } from 'next/server';
import { getDashboardAnalytics } from '@/actions/dashboardAnalytics';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ success: false, error: 'Missing userId' }, { status: 400 });
  const data = await getDashboardAnalytics(userId);
  return NextResponse.json({ success: true, data });
}
