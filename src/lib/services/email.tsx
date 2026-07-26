// src/lib/services/email.tsx
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeEmail from '@/lib/services/emailTemplates/WelcomeEmail';
import VerifyEmail from '@/lib/services/emailTemplates/VerifyEmail';
import ResetPasswordEmail from '@/lib/services/emailTemplates/ResetPasswordEmail';
import TwoFAOtpEmail from '@/lib/services/emailTemplates/TwoFAOtpEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || 'FitSync AI <noreply@fitsync.ai>';

/** Send a welcome email after registration */
export async function sendWelcomeEmail(email: string, name: string) {
  const html = await render(<WelcomeEmail name={name} />);
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Welcome to FitSync AI 🚀',
    html,
  });
}

/** Send verification email with a token link */
export async function sendVerifyEmail(email: string, name: string, token: string) {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${encodeURIComponent(token)}`;
  const html = await render(<VerifyEmail name={name} verificationLink={verificationLink} />);
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Verify your FitSync AI email',
    html,
  });
}

/** Send password‑reset email */
export async function sendResetPasswordEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${encodeURIComponent(token)}`;
  const html = await render(<ResetPasswordEmail resetLink={resetLink} />);
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'FitSync AI – Reset your password',
    html,
  });
}

/** Send 2FA OTP email */
// export async function send2FAOtpEmail(email: string, code: string) {
//   const html = await render(<TwoFAOtpEmail code={code} />);
//   await resend.emails.send({
//     from: FROM,
//     to: email,
//     subject: 'Your FitSync AI login code',
//     html,
//   });
// }
export async function send2FAOtpEmail(email: string, code: string) {
  const html = await render(<TwoFAOtpEmail code={code} />);

  const result = await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Your FitSync AI login code',
    html,
  });

  console.log("Resend Result:", result);
}