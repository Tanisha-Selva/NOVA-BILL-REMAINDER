import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0f172a',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }}>
        <h2>Loading NOVA...</h2>
      </div>
    );
  }

  return (
    <div>
      {!isAuthenticated ? <Login /> : <Dashboard />}
    </div>
  );
}

export default App;