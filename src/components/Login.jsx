import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif', margin: 0, overflow: 'hidden' }}>
      
      {/* Left Maroon Section */}
      <div style={{ 
        flex: 1, 
        background: '#831843', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '60px', 
        color: '#ffffff' 
      }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 10px 0', letterSpacing: '1px' }}>NOVA</h1>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Smart Bill Reminder</h2>
        <p style={{ fontSize: '15px', color: '#fbcfe8', maxWidth: '350px', lineHeight: '1.5', margin: 0 }}>
          Organize your bills, stay on schedule, and never miss a payment again.
        </p>
      </div>

      {/* Right Form Section */}
      <div style={{ 
        flex: 1, 
        background: '#fcfaf8', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '40px' 
      }}>
        <div style={{ 
          background: '#ffffff', 
          padding: '40px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)', 
          width: '100%', 
          maxWidth: '380px', 
          textAlign: 'center' 
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>Welcome Back</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '30px' }}>Sign in to continue</p>

          <button
            onClick={() => loginWithRedirect()}
            style={{
              width: '100%',
              background: '#831843',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Continue with Google / Auth0
          </button>

          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: '#9ca3af', fontSize: '12px', margin: '15px 0' }}>
            <div style={{ flex: 1, borderBottom: '1px solid #e5e7eb' }}></div>
            <span style={{ padding: '0 10px' }}>OR</span>
            <div style={{ flex: 1, borderBottom: '1px solid #e5e7eb' }}></div>
          </div>

          <button
            onClick={() => loginWithRedirect()}
            style={{
              width: '100%',
              background: '#ffffff',
              color: '#374151',
              border: '1px solid #d1d5db',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '25px'
            }}
          >
            Login with Email
          </button>

          <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>
            Don't have an account? <span style={{ color: '#831843', fontWeight: 'bold', cursor: 'pointer' }}>Register</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;