'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  Bot,
  LineChart,
  Target,
  MessageSquare,
  Bell,
  Settings,
  Activity,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/use-user-store';

export interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Workouts', href: '/dashboard/workouts', icon: Dumbbell },
  { name: 'AI Coach', href: '/dashboard/ai-coach', icon: Bot },
  { name: 'Progress', href: '/dashboard/progress', icon: LineChart },
  { name: 'Goals', href: '/dashboard/goals', icon: Target },
  { name: 'Trainer Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: 3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useUserStore();

  const content = (
    <div className="flex h-full flex-col justify-between p-5 bg-[#0E1422] border-r border-slate-800/80">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-between px-2">
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">FitSync AI</span>
          </Link>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="lg:hidden text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  'flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all',
                  isActive
                    ? 'bg-slate-800/90 text-emerald-400 font-semibold border border-slate-700/60 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={cn('h-4 w-4', isActive ? 'text-emerald-400' : 'text-slate-400')} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800/60">
        <button
          onClick={logout}
          className="flex w-full items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative z-10 w-64 max-w-xs h-full">{content}</div>
        </div>
      )}
    </>
  );
}
