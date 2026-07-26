import * as React from 'react';

interface ResetPasswordEmailProps {
  resetUrl: string;
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({ resetUrl }) => (
  <div style={{ fontFamily: 'sans-serif', backgroundColor: '#090D16', color: '#F8FAFC', padding: '32px' }}>
    <h2 style={{ color: '#6366F1' }}>Reset your FitSync AI Password</h2>
    <p style={{ color: '#94A3B8' }}>You requested a password reset. Click the button below to set a new password.</p>
    <a
      href={resetUrl}
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
      Reset Password
    </a>
  </div>
);

export default ResetPasswordEmail;
