'use client';

import { Target } from 'lucide-react';

interface Props {
  completed: number;
  total: number;
}

export default function DashboardGoals({
  completed,
  total,
}: Props) {

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-semibold text-white">
            Goal Progress
          </h2>

          <p className="text-slate-400 mt-1">
            Keep moving toward your fitness goals.
          </p>

        </div>

        <Target className="text-emerald-400" size={28} />

      </div>

      <div className="mt-8">

        <div className="flex justify-between text-sm mb-2">

          <span className="text-slate-400">
            Progress
          </span>

          <span className="text-white font-semibold">
            {percentage}%
          </span>

        </div>

        <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-600 transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="mt-5 flex justify-between">

          <div>

            <p className="text-slate-500 text-sm">
              Completed
            </p>

            <p className="text-white text-xl font-bold">
              {completed}
            </p>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              Total Goals
            </p>

            <p className="text-white text-xl font-bold">
              {total}
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}