import { TwoFactorForm } from '@/features/auth/TwoFactorForm';

export const metadata = {
  title: 'Two-Factor Verification - FitSync AI',
};

export default function TwoFactorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080C14] glow-background">
      <TwoFactorForm />
    </div>
  );
}
