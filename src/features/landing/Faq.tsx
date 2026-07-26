'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does FitSync AI calculate my fitness score?',
    a: 'FitSync AI aggregates your workout consistency, volume progression, recovery rate, and nutrition metrics into a normalized 0-100 score.',
  },
  {
    q: 'Can I export my workout data?',
    a: 'Yes, you can export your complete training history as CSV or JSON at any time from account settings.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'We offer a 14-day free trial on all premium plans without requiring a credit card upfront.',
  },
  {
    q: 'How secure is my personal health information?',
    a: 'Your data is encrypted end-to-end using AES-256 and stored on secure Supabase infrastructure with strict access controls.',
  },
];

export function Faq() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-[#080C14] border-b border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">Questions</p>
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#0E1422] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
