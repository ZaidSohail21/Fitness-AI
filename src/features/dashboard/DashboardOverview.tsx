'use client';

import React from 'react';
import { useProgressAnalytics } from '@/hooks/useProgressAnalytics';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { StatsCard } from '@/components/ui/stats-card';
import { toast } from 'sonner';

export default function DashboardOverview() {
  const { data, isLoading, isError } = useProgressAnalytics();

  if (isLoading) return <div className="flex justify-center items-center h-64"><div className="loader"/></div>;
  if (isError) {
    toast.error('Failed to load analytics');
    return <div className="text-red-500">Error loading analytics.</div>;
  }

  const { weeklyWorkouts, workoutHistory, goalProgress, currentStreak, personalRecords } = data ?? {};

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Current Streak" value={currentStreak?.days?.toString() ?? '0'} />
        <StatsCard title="Goals Completed" value={goalProgress?.completed?.toString() ?? '0'} />
        <StatsCard title="Personal Records" value={personalRecords?.total?.toString() ?? '0'} />
      </div>

      {/* Weekly Workout Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyWorkouts ?? []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="duration" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Workout History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (min)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workoutHistory?.map((w) => (
              <tr key={w.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{w.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{w.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{w.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
