'use client';

import { Flame } from 'lucide-react';

interface Props {
  days: number;
}

export default function DashboardStreakCard({ days }: Props) {
  return (
    <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/10 p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-300">
            Workout Streak
          </p>

          <h2 className="mt-3 text-5xl font-bold text-white">
            {days}
          </h2>

          <p className="text-orange-300 mt-2">
            Days in a row 🔥
          </p>

        </div>

        <div className="rounded-full bg-orange-500/20 p-5">
          <Flame
            className="text-orange-400"
            size={42}
          />
        </div>

      </div>

    </div>
  );
}