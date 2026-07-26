import * as React from 'react';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'Save up to 5 hours per week on workout planning',
  'Data-driven progression tracking with zero guesswork',
  'Automated weekly recovery and volume optimization',
  'Unified workspace for diet, strength, and endurance',
];

export function Benefits() {
  return (
    <section className="py-20 bg-[#060911] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Why FitSync AI</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
              Transform Your Training Experience Today
            </h2>
            <p className="text-slate-400 mt-4 text-base leading-relaxed">
              Traditional workout loggers are cumbersome. FitSync AI streamlines your workflow into an intuitive, high-speed SaaS interface built for serious athletes and fitness enthusiasts.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-[#0E1422] p-8 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Built for Scalability</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Whether you are an individual athlete or managing multiple coaching clients, our modular architecture scales seamlessly.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-2xl font-extrabold text-white">99.9%</p>
                <p className="text-xs text-slate-400">System Uptime</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-400">&lt; 50ms</p>
                <p className="text-xs text-slate-400">API Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
