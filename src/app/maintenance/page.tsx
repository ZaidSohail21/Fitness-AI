import { Wrench } from 'lucide-react';

export const metadata = {
  title: 'Maintenance Mode - FitSync AI',
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#080C14] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
        <Wrench className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">Under Scheduled Maintenance</h1>
      <p className="text-sm text-slate-400 max-w-sm mt-2 mb-4">
        FitSync AI is currently undergoing scheduled system upgrades. We will be back online shortly!
      </p>
      <span className="text-xs text-brand-400 font-semibold bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
        Estimated Uptime: &lt; 30 minutes
      </span>
    </div>
  );
}
