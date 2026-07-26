'use client';

import {
  Dumbbell,
  Trophy,
  Timer,
  Target,
} from 'lucide-react';

interface Props {
  workouts: number;
  goals: number;
  minutes: number;
  calories: number;
}

const cards = [
  {
    title: 'Total Workouts',
    key: 'workouts',
    icon: Dumbbell,
    color: 'bg-blue-500',
  },
  {
    title: 'Goals Completed',
    key: 'goals',
    icon: Trophy,
    color: 'bg-green-500',
  },
  {
    title: 'Minutes Trained',
    key: 'minutes',
    icon: Timer,
    color: 'bg-purple-500',
  },
  {
    title: 'Calories Burned',
    key: 'calories',
    icon: Target,
    color: 'bg-pink-500',
  },
];

export default function DashboardStats(props: Props) {
  const values = {
    workouts: props.workouts,
    goals: props.goals,
    minutes: props.minutes,
    calories: props.calories,
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-emerald-500 transition-all"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {values[card.key as keyof typeof values]}
                </h2>

              </div>

              <div
                className={`${card.color} rounded-xl p-4`}
              >
                <Icon
                  className="text-white"
                  size={24}
                />
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}