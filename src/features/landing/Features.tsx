import * as React from 'react';
import { Activity, ShieldCheck, Zap, Smartphone, Sparkles, BarChart2 } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-brand-400" />,
    title: 'AI Workout Generator',
    description: 'Personalized routines generated tailored precisely to your fitness level, goals, and equipment.',
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-emerald-400" />,
    title: 'Advanced Analytics',
    description: 'Real-time charts and metrics tracking volume, calories, target muscle groups, and strength progression.',
  },
  {
    icon: <Zap className="h-6 w-6 text-amber-400" />,
    title: 'Real-time Sync',
    description: 'Instantly sync workouts across mobile, web, and desktop without losing your training session state.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-400" />,
    title: 'Bank-Grade Security',
    description: 'Encrypted user data with Supabase Auth, role-based access control, and 2FA protection.',
  },
  {
    icon: <Smartphone className="h-6 w-6 text-purple-400" />,
    title: 'Cross-Platform',
    description: 'Seamless responsive interface built for desktop browsers, tablet monitors, and mobile screens.',
  },
  {
    icon: <Activity className="h-6 w-6 text-emerald-400" />,
    title: 'Intelligent Guidance',
    description: 'Get automated form recommendations and intelligent rest timer suggestions during workouts.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-[#080C14] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">Capabilities</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Engineered for Peak Performance</h2>
          <p className="text-slate-400 mt-3 text-base">
            Everything you need to plan, execute, and monitor your fitness journey with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <Card key={idx} className="p-6 space-y-3 hover:border-brand-500/40 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 mb-4">
                {item.icon}
              </div>
              <CardTitle className="text-lg font-bold text-white">{item.title}</CardTitle>
              <CardDescription className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
