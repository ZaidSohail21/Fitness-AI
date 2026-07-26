import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080C14]">
      <div className="flex flex-col items-center space-y-3">
        <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Loading FitSync AI...</p>
      </div>
    </div>
  );
}
