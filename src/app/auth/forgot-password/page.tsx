import { ForgotPasswordForm } from '@/features/auth/ForgotPasswordForm';

export const metadata = {
  title: 'Forgot Password - FitSync AI',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080C14] glow-background">
      <ForgotPasswordForm />
    </div>
  );
}
