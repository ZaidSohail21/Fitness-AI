import * as React from 'react';

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name }) => (
  <div style={{ fontFamily: 'sans-serif', backgroundColor: '#090D16', color: '#F8FAFC', padding: '32px' }}>
    <h1 style={{ color: '#6366F1' }}>Welcome to FitSync AI, {name}!</h1>
    <p style={{ color: '#94A3B8', fontSize: '16px' }}>
      We are thrilled to have you onboard. Train smarter, track workouts, and reach your fitness goals faster with AI coaching.
    </p>
    <a
      href="https://fitsync.ai/dashboard"
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
      Go to Dashboard
    </a>
  </div>
);

export default WelcomeEmail;
