'use client';

import {
  Brain,
  Sparkles,
  Activity,
  Heart,
} from 'lucide-react';

interface Props {
  recovery: string;
  recommendation: string;
  calories: number;
}

export default function DashboardAICoach({
  recovery,
  recommendation,
  calories,
}: Props) {

  return (

    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-emerald-500/20 p-3">

          <Brain
            className="text-emerald-400"
            size={28}
          />

        </div>

        <div>

          <h2 className="text-xl font-semibold text-white">
            AI Coach
          </h2>

          <p className="text-slate-400 text-sm">
            Personalized recommendations
          </p>

        </div>

      </div>

      <div className="space-y-5 mt-8">

        <div className="flex gap-3">

          <Sparkles
            className="text-yellow-400 mt-1"
            size={18}
          />

          <div>

            <p className="text-slate-400 text-sm">
              Recommendation
            </p>

            <p className="text-white">
              {recommendation}
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <Heart
            className="text-red-400 mt-1"
            size={18}
          />

          <div>

            <p className="text-slate-400 text-sm">
              Recovery
            </p>

            <p className="text-green-400 font-semibold">
              {recovery}
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <Activity
            className="text-cyan-400 mt-1"
            size={18}
          />

          <div>

            <p className="text-slate-400 text-sm">
              Daily Calories
            </p>

            <p className="text-white font-semibold">
              {calories} kcal
            </p>

          </div>

        </div>

      </div>

      <button
        className="
        mt-8
        w-full
        rounded-xl
        bg-emerald-500
        py-3
        font-semibold
        text-black
        transition
        hover:bg-emerald-400
        "
      >
        Generate AI Workout
      </button>

    </div>

  );
}