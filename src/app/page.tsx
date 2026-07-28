'use client';

import * as React from 'react';
import Link from 'next/link';
import { Hero } from '@/features/landing/Hero';
import { Features } from '@/features/landing/Features';
import { Benefits } from '@/features/landing/Benefits';
import { DashboardPreview } from '@/features/landing/DashboardPreview';
import { Faq } from '@/features/landing/Faq';
import { Footer } from '@/features/landing/Footer';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080C14]">
      {/* Top Navbar matching visual reference */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080C14]/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">FitSync Tracker</span>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="border-slate-800 bg-[#0E1422] text-slate-200 hover:bg-slate-800">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="emerald" size="sm" className="font-semibold shadow-emerald-500/20">
                Sign up
              </Button>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <Features />
        <Benefits />
        <DashboardPreview />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
