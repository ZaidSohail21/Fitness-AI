'use client';

import { Bell, Search } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

interface DashboardHeaderProps {
  userName?: string;
}

export default function DashboardHeader({
  userName = 'Athlete',
}: DashboardHeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      <div>
        <h1 className="text-4xl font-bold text-white">
          {greeting}, {userName} 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Stay consistent. Every workout counts.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />

          <Input
            placeholder="Search..."
            className="pl-10 bg-slate-900 border-slate-700"
          />
        </div>

        <button className="relative rounded-xl border border-slate-700 bg-slate-900 p-3 hover:bg-slate-800 transition">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <Avatar fallback="ZS" size="lg" className="border border-slate-700" />

      </div>

    </div>
  );
}
