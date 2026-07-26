// src/lib/services/emailTemplates/VerifyEmail.tsx
import * as React from 'react';
export default function VerifyEmail({ name, verificationLink }: { name: string; verificationLink: string }) {
  return <div>Hello {name}, verify your email <a href={verificationLink}>here</a>.</div>;
}
