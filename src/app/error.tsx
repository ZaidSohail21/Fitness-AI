'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { AlertOctagon } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#080C14] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
        <AlertOctagon className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">500 - Internal Server Error</h1>
      <p className="text-sm text-slate-400 max-w-sm mt-2 mb-6">
        An unexpected error occurred. Our team has been notified.
      </p>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
