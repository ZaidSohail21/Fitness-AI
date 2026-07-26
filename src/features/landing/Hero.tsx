'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, Activity, RefreshCw, Smartphone, ShieldCheck, Flame, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-[#080C14] border-b border-slate-900">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">AI-Powered Fitness Companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Train Smarter. <br />
              <span className="text-emerald-400">Achieve More.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed">
              Track workouts, analyze progress, and get AI coaching to reach your fitness goals faster.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/auth/register">
                <Button variant="emerald" size="lg" className="font-semibold shadow-emerald-500/20">
                  Start Free Today <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="#preview">
                <Button variant="outline" size="lg" className="border-slate-800 bg-[#0E1422] text-slate-200 hover:bg-slate-800">
                  <Play className="mr-2 h-4 w-4 text-slate-400" /> Watch Demo
                </Button>
              </Link>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
              <div className="flex items-start space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">AI Coach</h4>
                  <p className="text-[11px] text-slate-400">Personalized guidance</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <RefreshCw className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Real-time Sync</h4>
                  <p className="text-[11px] text-slate-400">Live updates anywhere</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Cross Platform</h4>
                  <p className="text-[11px] text-slate-400">Web, Mobile, Desktop</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Secure & Private</h4>
                  <p className="text-[11px] text-slate-400">Your data is safe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Hero Cards & Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md space-y-4">
              
              {/* Card 1: Weekly Progress */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1422]/90 p-4 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                  <span>Weekly Progress</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold text-emerald-400">5</span>
                  <span className="text-lg font-semibold text-slate-400">/ 6</span>
                  <div className="ml-auto">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Workouts Completed</p>
              </div>

              {/* Card 2: Calories Burned */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1422]/90 p-4 backdrop-blur-md shadow-xl">
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium mb-1">
                  <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                  <span>Calories Burned</span>
                </div>
                <div className="text-3xl font-extrabold text-white">2,450</div>
                <p className="text-xs text-slate-400 mt-0.5">This Week</p>
              </div>

              {/* Card 3: AI Fitness Score */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1422]/90 p-4 backdrop-blur-md shadow-xl flex items-center space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-500 text-emerald-400 font-bold text-lg bg-emerald-500/10">
                  92
                </div>
                <div>
                  <p className="text-xs text-slate-400">AI Fitness Score</p>
                  <p className="text-lg font-bold text-white flex items-center">
                    92% <span className="text-emerald-400 text-xs ml-1 font-normal">›</span>
                  </p>
                  <p className="text-xs text-emerald-400 font-medium">Excellent</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
