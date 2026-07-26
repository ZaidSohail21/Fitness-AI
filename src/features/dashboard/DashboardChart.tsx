'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
 XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface WorkoutData {
  day: string;
  duration: number;
}

interface Props {
  data: WorkoutData[];
}

export default function DashboardChart({ data }: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Weekly Workout Analytics
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Duration of workouts completed this week
        </p>
      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="duration"
              stroke="#10b981"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#10b981",
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}