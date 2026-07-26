import { ResetPasswordForm } from '@/features/auth/ResetPasswordForm';

export const metadata = {
  title: 'Reset Password - FitSync AI',
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080C14] glow-background">
      <ResetPasswordForm />
    </div>
  );
}
