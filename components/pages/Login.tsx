import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context';
import Card from '../shared/Card';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useData();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Admin1234' && password === 'password') {
      setError('');
      dispatch({ type: 'LOGIN' });
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen w-full relative text-text-primary flex items-center justify-center p-4">
      {/* Dreamy Sunset Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(180deg, 
              rgba(245,245,220,1) 0%, 
              rgba(255,223,186,0.8) 25%, 
              rgba(255,182,193,0.6) 50%, 
              rgba(147,112,219,0.7) 75%, 
              rgba(72,61,139,0.9) 100%
            ),
            radial-gradient(circle at 30% 20%, rgba(255,255,224,0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(72,61,139,0.6) 0%, transparent 70%),
            radial-gradient(circle at 50% 60%, rgba(147,112,219,0.3) 0%, transparent 60%)
          `,
        }}
      />
      <div className="relative z-10 w-full max-w-sm animate-fade-in-up">
        <h1 className="text-4xl font-bold text-center mb-8 text-text-primary">FinTrack Pro</h1>
        <Card>
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-text-primary">Welcome</h2>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-text-secondary mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text-primary focus:ring-accent focus:border-accent outline-none transition-all"
                required
              />
            </div>
            {error && <p className="text-danger text-sm text-center">{error}</p>}
            <div className="pt-2">
              <button type="submit" className="w-full bg-accent text-white font-bold py-2.5 px-6 rounded-lg hover:bg-accent/80 transition-all transform hover:scale-105 shadow-lg hover:shadow-accent/50">
                Login
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;