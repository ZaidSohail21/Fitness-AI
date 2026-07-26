import { LoginForm } from '@/features/auth/LoginForm';

export const metadata = {
  title: 'Login - FitSync AI',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080C14] glow-background">
      <LoginForm />
    </div>
  );
}
