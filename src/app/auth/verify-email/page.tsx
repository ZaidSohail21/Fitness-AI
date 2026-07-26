import { VerifyEmailView } from '@/features/auth/VerifyEmailView';

export const metadata = {
  title: 'Verify Email - FitSync AI',
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080C14] glow-background">
      <VerifyEmailView />
    </div>
  );
}
