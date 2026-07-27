// // src/hooks/useDashboardAnalytics.ts
// "use client";

// import { useQuery } from '@tanstack/react-query';
// import { createClient } from '@/lib/supabase/client';

// export function useDashboardAnalytics() {
//   const supabase = createClient();
//   return useQuery<
//     { totalWorkouts: number; totalVolumeLifted: number; currentStreak: number; goalsCompleted: number },
//     Error
//   >({
//     queryKey: ['dashboardAnalytics'],
//     queryFn: async () => {
//       const { data: authData, error: authError } = await supabase.auth.getUser();
//       if (authError) throw authError;
//       const userId = authData.user?.id;
//       if (!userId) throw new Error('User not authenticated');
//       const res = await fetch(`/api/dashboard/analytics?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch analytics');
//       const json = await res.json();
//       if (!json.success) throw new Error(json.error || 'Analytics error');
//       return json.data;
//     },
//     // Errors will be exposed via the hook's error field.
//   });
// }

"use client";

import { useEffect, useState } from "react";

export function useDashboard() {
  // const [stats, setStats] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [todaysWorkout, setTodaysWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard/analytics");
        const data = await res.json();

        // setStats(data.stats);
        setStats(data.stats);
        setTodaysWorkout(data.todaysWorkout);
        setRecentWorkouts(data.recentWorkouts);
        setGoals(data.goals);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

return {
    stats,
    todaysWorkout,
    recentWorkouts,
    goals,
    loading
};
}