import * as React from 'react';

interface TwoFactorEmailProps {
  code: string;
}

export const TwoFactorEmail: React.FC<TwoFactorEmailProps> = ({ code }) => (
  <div style={{ fontFamily: 'sans-serif', backgroundColor: '#090D16', color: '#F8FAFC', padding: '32px' }}>
    <h2 style={{ color: '#6366F1' }}>FitSync AI Security Code</h2>
    <p style={{ color: '#94A3B8' }}>Your two-factor authentication verification code is:</p>
    <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '4px', color: '#10B981', margin: '16px 0' }}>
      {code}
    </div>
    <p style={{ color: '#64748B', fontSize: '14px' }}>This code will expire in 10 minutes.</p>
  </div>
);

export default TwoFactorEmail;
