import Link from 'next/link';
import { Activity, Bell, Bot, CalendarDays, CheckCircle2, Dumbbell, LineChart, MessageSquare, Plus, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FitnessCanvas } from '@/features/dashboard/FitnessCanvas';

type Section = 'workouts' | 'ai-coach' | 'progress' | 'goals' | 'chat' | 'notifications';

const content: Record<Section, { title: string; subtitle: string; icon: typeof Dumbbell }> = {
  workouts: { title: 'Workouts', subtitle: 'Plan your training and keep your momentum going.', icon: Dumbbell },
  'ai-coach': { title: 'AI Coach', subtitle: 'Practical guidance built around your routine.', icon: Bot },
  progress: { title: 'Progress', subtitle: 'See how your consistency is turning into results.', icon: LineChart },
  goals: { title: 'Goals', subtitle: 'Small, measurable targets make lasting progress easier.', icon: Target },
  chat: { title: 'Trainer chat', subtitle: 'Your coaching notes and conversations, in one place.', icon: MessageSquare },
  notifications: { title: 'Notifications', subtitle: 'Stay on top of workouts, milestones, and reminders.', icon: Bell },
};

export default async function DashboardSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const item = content[section as Section];
  if (!item) return <MissingPage />;
  const Icon = item.icon;

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><span className="inline-flex rounded-xl bg-emerald-400/10 p-2.5 text-emerald-400"><Icon className="h-5 w-5" /></span><h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{item.title}</h1><p className="mt-2 text-slate-400">{item.subtitle}</p></div>
        <Button variant="emerald" className="w-full sm:w-auto"><Plus /> {section === 'goals' ? 'Create a goal' : section === 'workouts' ? 'Create workout' : 'Add reminder'}</Button>
      </section>
      {section === 'workouts' && <Workouts />}
      {section === 'ai-coach' && <Coach />}
      {section === 'progress' && <Progress />}
      {section === 'goals' && <Goals />}
      {section === 'chat' && <Chat />}
      {section === 'notifications' && <Notifications />}
    </div>
  );
}

function Workouts() { const sessions = [['Upper body strength', '6 exercises · 45 min', 'Ready for today'], ['Lower body power', '6 exercises · 50 min', 'Scheduled tomorrow'], ['Full body conditioning', '8 exercises · 40 min', 'Completed Thursday']]; return <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><h2 className="font-semibold text-white">Your workout plan</h2><div className="mt-5 divide-y divide-slate-800">{sessions.map(([name, details, status]) => <div key={name} className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400"><Dumbbell className="h-5 w-5" /></span><div className="flex-1"><p className="font-medium text-white">{name}</p><p className="text-sm text-slate-400">{details}</p></div><span className="text-sm text-emerald-400">{status}</span></div>)}</div></CardContent></Card> }
function Coach() { return <div className="grid gap-6 lg:grid-cols-3"><Card className="border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-[#0e1422] lg:col-span-2"><CardContent className="p-6"><Bot className="h-8 w-8 text-emerald-400" /><h2 className="mt-5 text-xl font-bold text-white">Today&apos;s coaching note</h2><p className="mt-3 max-w-2xl leading-relaxed text-slate-300">Your consistency is strong this week. For your next lower-body session, keep the first two sets controlled and add weight only if your form stays steady.</p><Button variant="outline" className="mt-6 border-slate-700 bg-slate-900 text-slate-100">Ask a question</Button></CardContent></Card><Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-6"><p className="text-sm text-slate-400">Readiness score</p><p className="mt-2 text-4xl font-bold text-emerald-400">92%</p><p className="mt-2 text-sm text-slate-400">Excellent recovery and momentum.</p></CardContent></Card></div> }
function Progress() { return <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-white">Training load</h2><p className="mt-1 text-sm text-slate-400">A clear view of your last seven days.</p></div><span className="text-sm font-semibold text-emerald-400">+18%</span></div><div className="mt-5"><FitnessCanvas /></div></CardContent></Card> }
function Goals() { const goals = [['Complete 6 workouts this week', 83], ['Train 1,500 minutes this month', 82], ['Finish 10 strength sessions', 80]]; return <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><h2 className="font-semibold text-white">Active goals</h2><div className="mt-6 space-y-6">{goals.map(([label, percent]) => <div key={label as string}><div className="mb-2 flex justify-between gap-3 text-sm"><span className="text-slate-200">{label}</span><span className="text-slate-400">{percent}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${percent}%` }} /></div></div>)}</div></CardContent></Card> }
function Chat() { return <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><div className="space-y-4"><div className="max-w-lg rounded-2xl rounded-tl-sm bg-slate-800 p-4 text-sm text-slate-200">What should I focus on in tomorrow&apos;s session?</div><div className="ml-auto max-w-lg rounded-2xl rounded-tr-sm bg-emerald-400 p-4 text-sm text-slate-950">Let&apos;s prioritize controlled reps and a gradual warm-up.</div></div><div className="mt-8 flex gap-3 border-t border-slate-800 pt-5"><input className="h-11 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400" placeholder="Write a message…" /><Button variant="emerald">Send</Button></div></CardContent></Card> }
function Notifications() { const notes = ['Your lower body workout is scheduled for tomorrow at 9:00 AM.', 'You are one workout away from this week’s target.', 'AI Coach has a new recommendation for your next session.']; return <Card className="border-slate-800 bg-[#0e1422]"><CardContent className="p-5 sm:p-6"><div className="space-y-3">{notes.map((note, i) => <div key={note} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /><div><p className="text-sm text-slate-200">{note}</p><p className="mt-1 text-xs text-slate-500">{i + 1} hour{i ? 's' : ''} ago</p></div></div>)}</div></CardContent></Card> }
function MissingPage() { return <div className="grid min-h-[50vh] place-items-center text-center"><div><Activity className="mx-auto h-10 w-10 text-emerald-400" /><h1 className="mt-4 text-2xl font-bold text-white">This page isn&apos;t ready yet</h1><Link href="/dashboard" className="mt-3 inline-block text-emerald-400 hover:text-emerald-300">Back to dashboard</Link></div></div> }
