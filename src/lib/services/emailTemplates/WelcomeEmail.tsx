// src/lib/services/emailTemplates/WelcomeEmail.tsx
import * as React from 'react';
export default function WelcomeEmail({ name }: { name: string }) {
  return <div>Welcome, {name}!</div>;
}
