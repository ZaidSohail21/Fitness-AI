import { useQuery } from '@tanstack/react-query';
import type { ProgressAnalyticsData } from '@/types';

export const useProgressAnalytics = () => {
  return useQuery<ProgressAnalyticsData, Error>({
    queryKey: ['progressAnalytics'],
    queryFn: async () => {
      const res = await fetch('/api/progress-analytics');
      if (!res.ok) throw new Error('Failed to fetch analytics');
      return (await res.json()) as ProgressAnalyticsData;
    },
    staleTime: 5 * 60 * 1000,
  });
};
