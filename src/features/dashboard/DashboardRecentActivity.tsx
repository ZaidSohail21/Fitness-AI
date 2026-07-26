'use client';

import {
  Bell,
  Trophy,
  Target,
  Dumbbell,
} from 'lucide-react';

interface Activity {
  id: string;
  message: string;
  time: string;
}

interface Props {
  activities: Activity[];
}

export default function DashboardRecentActivity({
  activities,
}: Props) {

  const icons = [
    Trophy,
    Target,
    Dumbbell,
    Bell,
  ];

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.length === 0 && (
          <p className="text-slate-400">
            No recent activity.
          </p>
        )}

        {activities.map((activity, index) => {

          const Icon = icons[index % icons.length];

          return (

            <div
              key={activity.id}
              className="flex gap-4"
            >

              <div className="rounded-full bg-emerald-500/20 p-3">

                <Icon
                  size={18}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <p className="text-white">
                  {activity.message}
                </p>

                <p className="text-sm text-slate-400">
                  {activity.time}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );
}