'use client';

import {
  Calendar,
  Clock3,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  calories?: number;
}

interface Props {
  workouts: Workout[];
}

export default function DashboardWorkoutTable({
  workouts,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Recent Workouts
        </h2>

        <span className="text-sm text-slate-400">
          {workouts.length} workouts
        </span>
      </div>

      <div className="space-y-4">

        {workouts.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
            No workouts completed yet.
          </div>
        )}

        {workouts.map((workout) => (

          <div
            key={workout.id}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 hover:border-emerald-500 transition"
          >

            <div>

              <h3 className="font-semibold text-white">
                {workout.name}
              </h3>

              <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">

                <div className="flex items-center gap-1">
                  <Calendar size={15}/>
                  {workout.date}
                </div>

                <div className="flex items-center gap-1">
                  <Clock3 size={15}/>
                  {workout.duration} min
                </div>

                <div className="flex items-center gap-1">
                  <Flame size={15}/>
                  {workout.calories ?? 0} kcal
                </div>

              </div>

            </div>

            <CheckCircle2
              className="text-emerald-400"
              size={24}
            />

          </div>

        ))}

      </div>

    </div>
  );
}