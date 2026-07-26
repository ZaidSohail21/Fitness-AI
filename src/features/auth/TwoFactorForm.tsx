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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { ShieldAlert } from 'lucide-react';

export function TwoFactorForm() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<string>('user-zaid-001');

  React.useEffect(() => {
    const storedId = sessionStorage.getItem('fitsync_2fa_user_id');
    if (storedId) setUserId(storedId);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorInput>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: '123456' },
  });

  const onSubmit = async (data: TwoFactorInput) => {
    setIsLoading(true);
    try {
      const res = await verify2FAAction(userId, data.code);
      if (!res.success) {
        toast.error(res.error || 'Invalid 2FA verification code.');
      } else {
        toast.success('2FA verification successful!');
        if (res.user) setUser(res.user);
        router.push('/dashboard');
      }
    } catch (err: any) {
      toast.error('An error occurred during 2FA verification.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-[#0E1422] border-slate-800 p-6 shadow-2xl">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Two-Factor Authentication</CardTitle>
        <CardDescription className="text-slate-400">
          Enter the 6-digit code sent to your email address
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-center">
              Verification Code (Demo: 123456)
            </label>
            <Input
              maxLength={6}
              className="text-center font-mono text-lg tracking-widest"
              placeholder="123456"
              error={errors.code?.message}
              {...register('code')}
            />
          </div>

          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            Verify Code & Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
