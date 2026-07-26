import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';

export const metadata = {
  title: 'Unauthorized - FitSync AI',
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#080C14] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
        <ShieldX className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">401 - Access Denied</h1>
      <p className="text-sm text-slate-400 max-w-sm mt-2 mb-6">
        You do not have permission to access this resource. Please login with appropriate credentials.
      </p>
      <Link href="/auth/login">
        <Button>Sign In to Continue</Button>
      </Link>
    </div>
  );
}
