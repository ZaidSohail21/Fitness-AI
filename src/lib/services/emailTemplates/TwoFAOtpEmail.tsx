// src/lib/services/emailTemplates/TwoFAOtpEmail.tsx
import * as React from 'react';
export default function TwoFAOtpEmail({ code }: { code: string }) {
  return <div>Your verification code is <strong>{code}</strong>.</div>;
}
