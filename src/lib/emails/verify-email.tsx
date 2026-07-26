import * as React from 'react';

interface VerifyEmailProps {
  name: string;
  verifyUrl: string;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ name, verifyUrl }) => (
  <div style={{ fontFamily: 'sans-serif', backgroundColor: '#090D16', color: '#F8FAFC', padding: '32px' }}>
    <h2 style={{ color: '#6366F1' }}>Verify your FitSync AI Account</h2>
    <p style={{ color: '#94A3B8' }}>Hi {name}, please click the button below to verify your email address.</p>
    <a
      href={verifyUrl}
      style={{
        display: 'inline-block',
        backgroundColor: '#4F46E5',
        color: '#FFFFFF',
        padding: '12px 24px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginTop: '16px',
      }}
    >
      Verify Email
    </a>
  </div>
);

export default VerifyEmail;
