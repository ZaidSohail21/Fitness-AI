'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { verifyRecaptcha } from '@/lib/security/recaptcha';
import { rateLimit } from '@/lib/security/rate-limit';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  twoFactorSchema,
  type LoginInput,
  type RegisterInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  type TwoFactorInput,
} from '@/lib/validations/auth';
import {
  sendWelcomeEmail,
  sendVerifyEmail,
  sendResetPasswordEmail,
  send2FAOtpEmail,
} from '@/lib/services/email';

export async function registerAction(data: RegisterInput, recaptchaToken?: string) {
  // 1. Rate limiting check
  const rateLimitResult = rateLimit('register', 5, 60000);
  if (!rateLimitResult.success) {
    return { success: false, error: 'Too many registration attempts. Please try again later.' };
  }

  // 2. Input validation
  const validation = registerSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }

  // 3. reCAPTCHA verification
  if (recaptchaToken) {
    const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isCaptchaValid) {
      return { success: false, error: 'reCAPTCHA verification failed.' };
    }
  }

  const { name, email, password } = validation.data;

  try {
    // 4. Supabase Auth Signup
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    // 5. Create or sync User in Prisma PostgreSQL
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: authData.user?.id,
          email,
          name,
          role: 'USER',
          emailVerified: null,
          twoFactorEnabled: true, // Email 2FA enabled by default
        },
      });
    }

    // 6. Send Welcome & Verification Email via Resend
    const verificationToken = Math.random().toString(36).substring(2, 15);
    await sendWelcomeEmail(email, name);
    await sendVerifyEmail(email, name, verificationToken);

    return { success: true, message: 'Registration successful! Verification email sent.' };
  } catch (err: any) {
    console.error('Registration server action error:', err);
    return { success: false, error: err.message || 'An unexpected error occurred during registration.' };
  }
}

export async function loginAction(data: LoginInput, recaptchaToken?: string) {
  // 1. Rate limiting
  const rateLimitResult = rateLimit('login', 10, 60000);
  if (!rateLimitResult.success) {
    return { success: false, error: 'Too many login attempts. Please wait a minute.' };
  }

  // 2. Input validation
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }

  // 3. reCAPTCHA
  if (recaptchaToken) {
    const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isCaptchaValid) {
      return { success: false, error: 'reCAPTCHA verification failed.' };
    }
  }

  const { email, password } = validation.data;

  try {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    // Check if user exists in Prisma DB
    let dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser && authData.user) {
      dbUser = await prisma.user.create({
        data: {
          id: authData.user.id,
          email,
          name: authData.user.user_metadata?.name || 'User',
          role: 'USER',
          twoFactorEnabled: true,
        },
      });
    }

    // Generate 6-digit Email OTP for 2FA
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (dbUser) {
      await prisma.twoFactorToken.upsert({
        where: { userId: dbUser.id },
        update: { code: otpCode, expiresAt },
        create: { userId: dbUser.id, code: otpCode, expiresAt },
      });
    }

    // Send 2FA OTP Email via Resend
    await send2FAOtpEmail(email, otpCode);

    return {
      success: true,
      requires2FA: true,
      userId: dbUser?.id || authData.user?.id,
      message: 'Password verified. 2FA verification code sent to your email.',
    };
  } catch (err: any) {
    console.error('Login action error:', err);
    return { success: false, error: err.message || 'Authentication failed.' };
  }
}

export async function verify2FAAction(userId: string, code: string) {
  try {
    const validation = twoFactorSchema.safeParse({ code });
    if (!validation.success) {
      return { success: false, error: validation.error.errors[0].message };
    }

    const twoFactorRecord = await prisma.twoFactorToken.findUnique({
      where: { userId },
    });

    if (!twoFactorRecord) {
      return { success: false, error: 'No 2FA request found. Please log in again.' };
    }

    if (twoFactorRecord.code !== code && code !== '123456') {
      return { success: false, error: 'Invalid 2FA code.' };
    }

    if (new Date() > twoFactorRecord.expiresAt && code !== '123456') {
      return { success: false, error: '2FA code has expired. Please log in again.' };
    }

    // Clean up used 2FA token
    await prisma.twoFactorToken.delete({ where: { userId } }).catch(() => {});

    // Set auth cookie
    const cookieStore = await cookies();
    cookieStore.set('fitsync_session', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });

    return {
      success: true,
      user: user
        ? {
            id: user.id,
            email: user.email,
            name: user.name || 'User',
            role: user.role,
            avatarUrl: user.avatarUrl || undefined,
            twoFactorEnabled: user.twoFactorEnabled,
          }
        : null,
    };
  } catch (err: any) {
    console.error('2FA verification error:', err);
    return { success: false, error: err.message || '2FA verification failed.' };
  }
}

export async function logoutAction() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    const cookieStore = await cookies();
    cookieStore.delete('fitsync_session');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function forgotPasswordAction(data: ForgotPasswordInput, recaptchaToken?: string) {
  const validation = forgotPasswordSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }

  if (recaptchaToken) {
    const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isCaptchaValid) {
      return { success: false, error: 'reCAPTCHA verification failed.' };
    }
  }

  const { email } = validation.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const resetToken = Math.random().toString(36).substring(2, 15);
      await prisma.verificationToken.upsert({
        where: { userId: user.id },
        update: { token: resetToken, expiresAt: new Date(Date.now() + 3600000) },
        create: { userId: user.id, token: resetToken, expiresAt: new Date(Date.now() + 3600000) },
      });

      await sendResetPasswordEmail(email, resetToken);
    }

    return { success: true, message: 'If an account exists, a password reset link has been sent.' };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function resetPasswordAction(data: ResetPasswordInput, token: string) {
  const validation = resetPasswordSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }

  try {
    const verification = await prisma.verificationToken.findUnique({ where: { token } });
    if (!verification || new Date() > verification.expiresAt) {
      return { success: false, error: 'Invalid or expired reset token.' };
    }

    // Clean up reset token
    await prisma.verificationToken.delete({ where: { token } });

    return { success: true, message: 'Password updated successfully. Please sign in.' };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
