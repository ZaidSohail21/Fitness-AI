'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';

export function VerifyEmailView() {
  return (
    <Card className="w-full max-w-md bg-[#0E1422] border-slate-800 p-6 shadow-2xl text-center">
      <CardHeader className="pb-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <MailCheck className="h-7 w-7" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Verify Your Email</CardTitle>
        <CardDescription className="text-slate-400 mt-2">
          We have sent a verification link to your registered email address.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-xs text-slate-400">
          Please check your inbox and click the verification button to activate your account.
        </p>

        <div className="pt-4 border-t border-slate-800">
          <Link
            href="/auth/login"
            className="inline-block w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Return to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
