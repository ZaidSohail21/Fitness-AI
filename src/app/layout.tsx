import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppProvider } from '@/providers/app-provider';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'FitSync AI - AI-Powered Fitness Companion',
  description: 'Track workouts, analyze progress, and get AI coaching to reach your fitness goals faster.',
  keywords: ['Fitness AI', 'Workout Tracker', 'AI Coach', 'SaaS', 'Fitness Analytics'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark", "font-sans", geist.variable)}>
      <body className="bg-[#080C14] text-slate-100 antialiased selection:bg-brand-500 selection:text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
