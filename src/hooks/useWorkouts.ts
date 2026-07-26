// src/hooks/useWorkouts.ts
"use client";

import { useQuery } from '@tanstack/react-query';

const API_URL = '/api/workouts';

export function useWorkouts(params?: Record<string, any>) {
  return useQuery({
    queryKey: ['workouts', params],
    queryFn: async () => {
      const qs = new URLSearchParams(params as any).toString();
      const res = await fetch(`${API_URL}?${qs}`);
      if (!res.ok) throw new Error('Failed to fetch workouts');
      return res.json();
    },
    // Errors will be exposed via the hook's error field.
  });
}
