// src/lib/services/emailTemplates/ResetPasswordEmail.tsx
import * as React from 'react';
export default function ResetPasswordEmail({ resetLink }: { resetLink: string }) {
  return <div>Reset your password <a href={resetLink}>here</a>.</div>;
}
