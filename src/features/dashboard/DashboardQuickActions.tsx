'use client';

import {
  Plus,
  Brain,
  ClipboardList,
  Target,
} from 'lucide-react';

const actions = [
  {
    title: 'Start Workout',
    icon: Plus,
    color: 'bg-emerald-500',
  },
  {
    title: 'Generate AI Plan',
    icon: Brain,
    color: 'bg-violet-500',
  },
  {
    title: 'Workout Templates',
    icon: ClipboardList,
    color: 'bg-blue-500',
  },
  {
    title: 'Set New Goal',
    icon: Target,
    color: 'bg-orange-500',
  },
];

export default function DashboardQuickActions() {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.title}
              className="group flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-950 p-5 transition hover:border-emerald-500 hover:-translate-y-1"
            >

              <div
                className={`rounded-xl p-3 ${action.color}`}
              >
                <Icon
                  size={22}
                  className="text-white"
                />
              </div>

              <div className="text-left">

                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition">
                  {action.title}
                </h3>

                <p className="text-sm text-slate-400">
                  Click to continue
                </p>

              </div>

            </button>

          );

        })}

      </div>

    </div>

  );
}