import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import './AuthGate.css';

// Uniform password for all members
const UNIFORM_PASSWORD = 'mosaic2026';

export default function AuthGate({ onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === UNIFORM_PASSWORD) {
      onAuthenticate();
    } else {
      setError('Incorrect password. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="auth-gate">
      <div className="auth-bg-mosaic">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="bg-tile"
            style={{
              '--i': i,
              '--x': `${(i * 37) % 100}%`,
              '--y': `${(i * 53) % 100}%`,
              '--size': 40 + (i % 5) * 20,
              '--color': `var(--c${(i % 10) + 1})`,
              '--rotation': (i * 23) % 360,
            }}
          />
        ))}
      </div>

      <div className="auth-container">
        <div className={`auth-card ${isShaking ? 'shake' : ''}`}>
          <div className="auth-logo">
            <img src="/mainwebsitelogo.png" alt="Mosaic Logo" className="auth-logo-img" />
          </div>

          <h1 className="auth-title display-font">The Mosaic Foundation</h1>
          <p className="auth-subtitle handwritten">Member Portal</p>

          <div className="auth-divider">
            <Lock size={24} color="var(--accent)" />
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Enter Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter the uniform password"
                  className="auth-input"
                  autoFocus
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="error-text">{error}</p>}
            </div>

            <button type="submit" className="btn btn-primary auth-btn">
              Enter Portal
            </button>
          </form>

          <p className="auth-hint handwritten">
            ✦ Built by youth, for the world ✦
          </p>
        </div>
      </div>
    </div>
  );
}
