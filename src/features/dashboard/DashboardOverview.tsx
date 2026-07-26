'use client';

import { Activity, ArrowUpRight, CalendarDays, Dumbbell, Flame, Target, Timer, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FitnessCanvas } from './FitnessCanvas';

const activities = [
  ['Upper body strength', '45 min · 420 kcal', 'Today, 08:40'],
  ['Morning run', '5.2 km · 310 kcal', 'Yesterday'],
  ['Mobility flow', '20 min · Recovery', 'Thu'],
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-medium text-emerald-400">Saturday, July 26</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">Your fitness, in motion.</h1><p className="mt-2 text-sm text-slate-400">You are one workout away from your weekly goal.</p></div>
        <Button variant="emerald" className="w-full sm:w-auto"><Dumbbell /> Start today&apos;s workout <ArrowUpRight /></Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<Dumbbell />} label="Workouts this week" value="5 / 6" note="One to go" />
        <Metric icon={<Flame />} label="Calories burned" value="2,450" note="+12% vs last week" />
        <Metric icon={<Timer />} label="Training time" value="4h 35m" note="45 min today" />
        <Metric icon={<Trophy />} label="Current streak" value="12 days" note="Personal best: 18" />
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <Card className="border-slate-800 bg-[#0e1422] xl:col-span-3"><CardContent className="p-5 sm:p-6"><div className="mb-4 flex items-start justify-between"><div><h2 className="font-semibold text-white">Weekly training load</h2><p className="mt-1 text-xs text-slate-400">Click a day to explore your performance.</p></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">On track</span></div><FitnessCanvas /></CardContent></Card>
        <Card className="border-slate-800 bg-[#0e1422] xl:col-span-2"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-semibold text-white">Next session</h2><CalendarDays className="h-5 w-5 text-emerald-400" /></div><div className="mt-6 rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-400/10 to-transparent p-5"><p className="text-xs font-medium uppercase tracking-wider text-emerald-300">Sunday · 9:00 AM</p><h3 className="mt-2 text-xl font-bold text-white">Lower body power</h3><p className="mt-2 text-sm text-slate-400">6 exercises · 50 minutes</p><Button variant="outline" className="mt-5 w-full border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800">View workout</Button></div></CardContent></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-semibold text-white">Recent activity</h2><button className="text-sm text-emerald-400 hover:text-emerald-300">View all</button></div><div className="mt-5 divide-y divide-slate-800">{activities.map(([title, detail, time]) => <div key={title} className="flex items-center gap-3 py-4 first:pt-0"><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-emerald-400"><Activity className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="font-medium text-slate-100">{title}</p><p className="text-sm text-slate-400">{detail}</p></div><time className="text-xs text-slate-500">{time}</time></div>)}</div></CardContent></Card>
        <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-semibold text-white">Goal progress</h2><Target className="h-5 w-5 text-emerald-400" /></div><div className="mt-6 space-y-5"><Goal label="Weekly consistency" value="5 of 6 workouts" percent={83} /><Goal label="Monthly active minutes" value="1,240 of 1,500 min" percent={82} /><Goal label="Strength sessions" value="8 of 10 sessions" percent={80} /></div></CardContent></Card>
      </section>
    </div>
  );
}

function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) { return <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5"><div className="flex items-start justify-between"><div><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-white">{value}</p><p className="mt-1 text-xs text-emerald-400">{note}</p></div><span className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">{icon}</span></div></CardContent></Card> }
function Goal({ label, value, percent }: { label: string; value: string; percent: number }) { return <div><div className="mb-2 flex justify-between gap-2 text-sm"><span className="font-medium text-slate-200">{label}</span><span className="text-slate-400">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300" style={{ width: `${percent}%` }} /></div></div> }
