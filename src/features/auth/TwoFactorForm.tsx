'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twoFactorSchema, type TwoFactorInput } from '@/lib/validations/auth';
import { verify2FAAction } from '@/actions/auth';
import { useUserStore } from '@/store/use-user-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { ShieldAlert } from 'lucide-react';

export function TwoFactorForm() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [isLoading, setIsLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<string>('user-zaid-001');

  React.useEffect(() => {
    const storedId = sessionStorage.getItem('fitsync_2fa_user_id');
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorInput>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: TwoFactorInput) => {
    setIsLoading(true);

    try {
      const res = await verify2FAAction(userId, data.code);

      if (!res.success) {
        toast.error(res.error || 'Invalid verification code.');
        return;
      }

      toast.success('Verification successful! Welcome back.');

      if (res.user) {
        setUser(res.user);
      }

      router.push('/dashboard');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-slate-800 bg-[#0E1422] p-6 shadow-2xl">
      <CardHeader className="pb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
          <ShieldAlert className="h-6 w-6" />
        </div>

        <CardTitle className="text-2xl font-bold text-white">
          Two-Factor Authentication
        </CardTitle>

        <CardDescription className="space-y-2 text-slate-400">
          <p>
            Enter the verification code to securely access your FitSync account.
          </p>

          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            <span className="font-semibold"></span> Use verification
            code <span className="font-mono font-bold"></span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
              One-Time Verification Code
            </label>

            <Input
              maxLength={6}
              placeholder="Enter verification code"
              className="text-center font-mono text-lg tracking-[0.4em]"
              error={errors.code?.message}
              {...register('code')}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Verify & Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}