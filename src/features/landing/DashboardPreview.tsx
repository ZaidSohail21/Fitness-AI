'use client';

import * as React from 'react';
import {
  LayoutDashboard,
  Dumbbell,
  Bot,
  LineChart,
  Target,
  MessageSquare,
  Bell,
  Settings,
  Search,
  Flame,
  CheckCircle2,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function DashboardPreview() {
  return (
    <div id="preview" className="py-16 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="emerald" className="mb-2">Full Platform Preview</Badge>
          <h2 className="text-3xl font-extrabold text-white">Experience the Future of Fitness</h2>
        </div>

        {/* Outer Dashboard Window Container */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0A0E1A] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 border-r border-slate-800/80 bg-[#0E1422] p-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Brand Logo */}
              <div className="flex items-center space-x-2.5 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ActivityIcon className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">FitSync AI</span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <button className="flex w-full items-center space-x-3 rounded-xl bg-slate-800/80 px-3.5 py-2.5 text-xs font-semibold text-emerald-400 border border-slate-700/50">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>

                <button className="flex w-full items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                  <Dumbbell className="h-4 w-4" />
                  <span>Workouts</span>
                </button>

                <button className="flex w-full items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                  <Bot className="h-4 w-4" />
                  <span>AI Coach</span>
                </button>

                <button className="flex w-full items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                  <LineChart className="h-4 w-4" />
                  <span>Progress</span>
                </button>

                <button className="flex w-full items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                  <Target className="h-4 w-4" />
                  <span>Goals</span>
                </button>

                <button className="flex w-full items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>Trainer Chat</span>
                </button>

                <button className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </div>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">
                    3
                  </span>
                </button>

                <button className="flex w-full items-center space-x-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Dashboard Content */}
          <main className="lg:col-span-9 p-6 bg-[#080C14] flex flex-col justify-between space-y-6">
            
            {/* Top Navbar */}
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center">
                  Dashboard <span className="ml-2">👋</span>
                </h3>
                <p className="text-xs text-slate-400">Welcome back, Zaid! Ready to crush your goals today?</p>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    readOnly
                    placeholder="Search workouts, exercises..."
                    className="h-9 w-full rounded-xl border border-slate-800 bg-[#0E1422] pl-9 pr-3 text-xs text-slate-300 focus:outline-none"
                  />
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#0E1422] text-slate-300">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  fallback="ZA"
                  size="md"
                />
              </div>
            </header>

            {/* 4 Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stat 1: Today's Workout */}
              <div className="rounded-2xl border border-slate-800/80 bg-[#0E1422] p-4 flex items-center space-x-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Today's Workout</p>
                  <p className="text-sm font-bold text-white">Chest Day</p>
                  <p className="text-[11px] text-slate-400">6 Exercises</p>
                </div>
              </div>

              {/* Stat 2: Calories Burned */}
              <div className="rounded-2xl border border-slate-800/80 bg-[#0E1422] p-4 flex items-center space-x-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Calories Burned</p>
                  <p className="text-sm font-bold text-white">420 <span className="text-xs font-normal text-slate-400">kcal</span></p>
                  <p className="text-[11px] text-emerald-400 font-medium">+12% from yesterday</p>
                </div>
              </div>

              {/* Stat 3: Weekly Progress */}
              <div className="rounded-2xl border border-slate-800/80 bg-[#0E1422] p-4 flex items-center space-x-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Weekly Progress</p>
                  <p className="text-sm font-bold text-white">5 / 6 <span className="text-emerald-400 text-xs">↗</span></p>
                  <p className="text-[11px] text-slate-400">Workouts completed</p>
                </div>
              </div>

              {/* Stat 4: AI Score */}
              <div className="rounded-2xl border border-slate-800/80 bg-[#0E1422] p-4 flex items-center space-x-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">AI Score</p>
                  <p className="text-sm font-bold text-white">92% <span className="text-emerald-400 text-xs">↗</span></p>
                  <p className="text-[11px] text-emerald-400 font-medium">Excellent</p>
                </div>
              </div>

            </div>

            {/* Bottom Row Grid (Progress Chart + Recent Activity) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Progress Overview (Line Chart) */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-800/80 bg-[#0E1422] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white">Progress Overview</h4>
                  <div className="flex items-center space-x-1 border border-slate-800 bg-[#0A0E1A] px-2.5 py-1 rounded-lg text-xs text-slate-300">
                    <span>This Month</span>
                    <ChevronDown className="h-3 w-3 text-slate-500" />
                  </div>
                </div>

                {/* SVG Curve Line Graph matching reference */}
                <div className="relative h-48 w-full flex flex-col justify-between pt-2">
                  <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-600 pointer-events-none">
                    <div className="border-b border-slate-800/40 pb-1">100kg</div>
                    <div className="border-b border-slate-800/40 pb-1">80kg</div>
                    <div className="border-b border-slate-800/40 pb-1">60kg</div>
                    <div className="border-b border-slate-800/40 pb-1">40kg</div>
                  </div>

                  {/* Emerald Glowing SVG Line */}
                  <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 150">
                    <defs>
                      <linearGradient id="gradientEmerald" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    <path
                      d="M 10 130 Q 50 110, 80 120 T 150 70 T 220 90 T 300 70 T 385 20 L 385 150 L 10 150 Z"
                      fill="url(#gradientEmerald)"
                    />

                    <path
                      d="M 10 130 Q 50 110, 80 120 T 150 70 T 220 90 T 300 70 T 385 20"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Tooltip Point */}
                    <circle cx="150" cy="70" r="5" fill="#10B981" stroke="#0E1422" strokeWidth="2" />
                  </svg>

                  {/* Tooltip box */}
                  <div className="absolute top-[35px] left-[115px] bg-[#0A0E1A] border border-slate-700/80 rounded-lg px-2 py-1 shadow-lg text-center">
                    <p className="text-[11px] font-bold text-white">75kg</p>
                    <p className="text-[9px] text-slate-400">May 12</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity List */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-800/80 bg-[#0E1422] p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white">Recent Activity</h4>
                  <button className="text-xs text-slate-400 hover:text-white font-medium">View All</button>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300 border border-slate-700/50">
                        <Dumbbell className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Bench Press</p>
                        <p className="text-[11px] text-slate-400">80kg • 4 Sets • 12 Reps</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500">2m ago</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300 border border-slate-700/50">
                        <Dumbbell className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Squat</p>
                        <p className="text-[11px] text-slate-400">100kg • 5 Sets • 10 Reps</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500">1h ago</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">AI Coach Recommendation</p>
                        <p className="text-[11px] text-slate-400">New workout plan generated</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500">3h ago</span>
                  </div>
                </div>
              </div>

            </div>

          </main>

        </div>
      </div>
    </div>
  );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
