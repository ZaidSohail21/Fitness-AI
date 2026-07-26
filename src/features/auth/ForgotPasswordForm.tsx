'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, KeyRound } from 'lucide-react';

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email.');
    } catch (err) {
      toast.error('Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-[#0E1422] border-slate-800 p-6 shadow-2xl">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-3">
          <KeyRound className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Reset Password</CardTitle>
        <CardDescription className="text-slate-400">
          Enter your email and we'll send you a password reset link
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <Input
                type="email"
                placeholder="name@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-emerald-400 font-semibold">Check your inbox!</p>
            <p className="text-xs text-slate-400">
              We have sent a password reset link to your email address.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t border-slate-800/80 pt-4">
        <Link href="/auth/login" className="text-xs font-semibold text-brand-400 hover:underline">
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  );
}
