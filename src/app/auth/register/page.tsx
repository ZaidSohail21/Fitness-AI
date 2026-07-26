import { RegisterForm } from '@/features/auth/RegisterForm';

export const metadata = {
  title: 'Register - FitSync AI',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080C14] glow-background">
      <RegisterForm />
    </div>
  );
}
