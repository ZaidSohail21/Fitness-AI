// src/hooks/useDashboardAnalytics.ts
"use client";

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export function useDashboardAnalytics() {
  const supabase = createClient();
  return useQuery<
    { totalWorkouts: number; totalVolumeLifted: number; currentStreak: number; goalsCompleted: number },
    Error
  >({
    queryKey: ['dashboardAnalytics'],
    queryFn: async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      const userId = authData.user?.id;
      if (!userId) throw new Error('User not authenticated');
      const res = await fetch(`/api/dashboard/analytics?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch analytics');
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Analytics error');
      return json.data;
    },
    // Errors will be exposed via the hook's error field.
  });
}
