'use client';

import { Activity, ArrowUpRight, CalendarDays, Dumbbell, Flame, Target, Timer, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FitnessCanvas } from './FitnessCanvas';
import { useDashboard } from "@/hooks/useDashboardAnalytics";

// const activities = [
//   ['Upper body strength', '45 min · 420 kcal', 'Today, 08:40'],
//   ['Morning run', '5.2 km · 310 kcal', 'Yesterday'],
//   ['Mobility flow', '20 min · Recovery', 'Thu'],
// ];

export default function DashboardOverview() {
  // const { stats, loading } = useDashboard();
const {
    stats,
    todaysWorkout,
    recentWorkouts,
    goals,
    loading
} = useDashboard();

  if (loading) {
    return (
      <div className="text-center py-20 text-white">
        Loading Dashboard...
      </div>
    );
  }
  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-medium text-emerald-400">Saturday, July 26</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">Your fitness, in motion.</h1><p className="mt-2 text-sm text-slate-400">You are one workout away from your weekly goal.</p></div>
        <Button variant="emerald" className="w-full sm:w-auto"><Dumbbell /> Start today&apos;s workout <ArrowUpRight /></Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={<Dumbbell />}
          label="Workouts"
          value={stats.totalWorkouts.toString()}
          note={`${stats.weeklyWorkouts} this week`}
        />

        <Metric
          icon={<Flame />}
          label="Calories Burned"
          value={stats.caloriesBurned.toLocaleString()}
          note="Total calories"
        />

        <Metric
          icon={<Timer />}
          label="Training Time"
          value={
            stats.totalMinutes > 0
              ? `${Math.floor(stats.totalMinutes / 60)}h ${stats.totalMinutes % 60}m`
              : "0h 0m"
          }
          note="Total training time"
        />

        <Metric
          icon={<Trophy />}
          label="Current Streak"
          value={`${stats.currentStreak} days`}
          note="Keep the streak alive!"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <Card className="border-slate-800 bg-[#0e1422] xl:col-span-3">
          <CardContent className="p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-white">
                  Weekly training load</h2><p className="mt-1 text-xs text-slate-400">Click a day to explore your performance.</p></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">On track</span></div><FitnessCanvas /></CardContent></Card>
        {/* <Card className="border-slate-800 bg-[#0e1422] xl:col-span-2"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-semibold text-white">Next session</h2><CalendarDays className="h-5 w-5 text-emerald-400" /></div><div className="mt-6 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/10 to-transparent p-5"><p className="text-xs font-medium uppercase tracking-wider text-emerald-300">Sunday · 9:00 AM</p><h3 className="mt-2 text-xl font-bold text-white">Lower body power</h3><p className="mt-2 text-sm text-slate-400">6 exercises · 50 minutes</p><Button variant="outline" className="mt-5 w-full border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800">View workout</Button></div></CardContent></Card> */}
        <Card className="border-slate-800 bg-[#0e1422] xl:col-span-2">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">
                Today's AI Workout
              </h2>

              <Dumbbell className="h-5 w-5 text-emerald-400" />
            </div>

            {todaysWorkout ? (
              <div className="mt-6 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/10 to-transparent p-5">

                <p className="text-xs font-medium uppercase tracking-wider text-emerald-300">
                  {new Date(todaysWorkout.date).toLocaleDateString()}
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  {todaysWorkout.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {todaysWorkout.workoutExercises.length} Exercises • {todaysWorkout.durationMinutes ?? 0} Minutes
                </p>

                <Button
                  variant="outline"
                  className="mt-5 w-full border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                >
                  Continue Workout
                </Button>

              </div>
            ) : (

              <div className="mt-8 text-center">

                <p className="text-slate-400">
                  No workout planned today.
                </p>

                <Button
                  variant="emerald"
                  className="mt-5 w-full"
                >
                  Generate AI Workout
                </Button>

              </div>

            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-semibold text-white">Recent activity</h2><button className="text-sm text-emerald-400 hover:text-emerald-300">View all</button></div><div className="mt-5 divide-y divide-slate-800">{recentWorkouts.length > 0 ? (
  recentWorkouts.map((workout) => (
    <div
      key={workout.id}
      className="flex items-center gap-3 py-4 first:pt-0"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-emerald-400">
        <Activity className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-medium text-slate-100">
          {workout.title}
        </p>

        <p className="text-sm text-slate-400">
          {workout.durationMinutes ?? 0} min •{" "}
          {workout.caloriesBurned ?? 0} kcal
        </p>
      </div>

      <time className="text-xs text-slate-500">
        {new Date(workout.date).toLocaleDateString()}
      </time>
    </div>
  ))
) : (
  <div className="py-6 text-center text-slate-400">
    No workouts found.
  </div>
)}</div></CardContent></Card>
        <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-semibold text-white">Goal progress</h2><Target className="h-5 w-5 text-emerald-400" /></div>
        <div className="mt-6 space-y-5">

  {goals.length > 0 ? (

    goals.map((goal) => (

      <Goal
        key={goal.id}
        label={goal.type}
        value={`${goal.currentValue ?? 0} / ${goal.targetValue} ${goal.unit}`}
        percent={goal.percentage}
      />

    ))

  ) : (

    <p className="text-center text-slate-400">
      No goals found.
    </p>

  )}

</div>
        </CardContent></Card>
      </section>
    </div>
  );
}

function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) { return <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-white">{value}</p><p className="mt-1 text-xs text-emerald-400">{note}</p></div><span className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">{icon}</span></div></CardContent></Card> }
function Goal({ label, value, percent }: { label: string; value: string; percent: number }) { return <div><div className="mb-2 flex justify-between gap-2 text-sm"><span className="font-medium text-slate-200">{label}</span><span className="font-medium text-emerald-400">

{value}

</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300" style={{ width: `${percent}%` }} /></div></div> }
