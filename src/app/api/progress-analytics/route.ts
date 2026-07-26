// src/app/api/progress-analytics/route.ts
// import { NextResponse } from 'next/server';
// import { getProgressAnalytics } from '@/actions/progressAnalytics';
// import { createClient } from '@/lib/supabase/client';

// export async function GET(request: Request) {
//   const supabase = createClient();
//   const { data: authData, error: authError } = await supabase.auth.getUser();
//   if (authError) throw authError;
//   const userId = authData.user?.id;
//   if (!userId) return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
//   const result = await getProgressAnalytics(userId);
//   return NextResponse.json({ success: true, data: result });
// }

import { NextResponse } from 'next/server';
import { getProgressAnalytics } from '@/actions/progressAnalytics';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const result = await getProgressAnalytics(user.id);

  return NextResponse.json({
    success: true,
    data: result,
  });
}