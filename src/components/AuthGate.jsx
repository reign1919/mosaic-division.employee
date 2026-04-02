import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Shield, Clock, Fingerprint } from 'lucide-react';
import './AuthGate.css';

// Security configuration
const SECURITY_CONFIG = {
  // Primary password (uniform for all employees)
  PRIMARY_PASSWORD: 'mosaic2026',

  // Secret question for 2FA (answer must match exactly, case-insensitive)
  SECRET_QUESTION: 'What is the founder\'s favorite color?',
  SECRET_ANSWER: 'red',

  // Rate limiting
  MAX_ATTEMPTS: 3,
  LOCKOUT_DURATION_MS: 5 * 60 * 1000, // 5 minutes
  ATTEMPT_WINDOW_MS: 10 * 60 * 1000,  // 10 minutes

  // Session management
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes of inactivity
  MAX_SESSION_MS: 8 * 60 * 60 * 1000, // 8 hours absolute max
};

// Generate browser fingerprint
const generateFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('fingerprint', 2, 2);

  const fingerprint = {
    ua: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvasHash: canvas.toDataURL().slice(0, 100),
  };

  return btoa(JSON.stringify(fingerprint)).slice(0, 64);
};

export default function AuthGate({ onAuthenticate, sessionExpired = false }) {
  const [step, setStep] = useState('password'); // 'password' | 'secret' | 'verified'
  const [password, setPassword] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // Security state
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Check for active lockout on mount
  useEffect(() => {
    const storedLockout = localStorage.getItem('tmf-lockout');
    const storedAttempts = localStorage.getItem('tmf-failed-attempts');

    if (storedLockout) {
      const lockoutTime = parseInt(storedLockout, 10);
      if (Date.now() < lockoutTime) {
        setLockoutUntil(lockoutTime);
      } else {
        localStorage.removeItem('tmf-lockout');
        localStorage.removeItem('tmf-failed-attempts');
      }
    }

    if (storedAttempts) {
      const attempts = parseInt(storedAttempts, 10);
      const attemptTime = parseInt(localStorage.getItem('tmf-attempt-time') || '0', 10);
      if (Date.now() - attemptTime > SECURITY_CONFIG.ATTEMPT_WINDOW_MS) {
        localStorage.removeItem('tmf-failed-attempts');
        localStorage.removeItem('tmf-attempt-time');
        setFailedAttempts(0);
      } else {
        setFailedAttempts(attempts);
      }
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (!lockoutUntil) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, lockoutUntil - Date.now());
      setLockoutRemaining(remaining);

      if (remaining === 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        localStorage.removeItem('tmf-lockout');
        localStorage.removeItem('tmf-failed-attempts');
        localStorage.removeItem('tmf-attempt-time');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (lockoutUntil && Date.now() < lockoutUntil) {
      setError(`Too many failed attempts. Try again in ${Math.ceil(lockoutRemaining / 60000)} minutes.`);
      return;
    }

    if (password === SECURITY_CONFIG.PRIMARY_PASSWORD) {
      setStep('secret');
      setError('');
      setPassword('');
    } else {
      handleFailedAttempt();
    }
  };

  const handleSecretSubmit = (e) => {
    e.preventDefault();

    if (secretAnswer.toLowerCase().trim() === SECURITY_CONFIG.SECRET_ANSWER.toLowerCase()) {
      completeAuthentication();
    } else {
      handleFailedAttempt();
    }
  };

  const handleFailedAttempt = () => {
    const now = Date.now();
    const attemptTime = parseInt(localStorage.getItem('tmf-attempt-time') || now, 10);

    // Reset attempts if outside window
    if (now - attemptTime > SECURITY_CONFIG.ATTEMPT_WINDOW_MS) {
      setFailedAttempts(1);
      localStorage.setItem('tmf-failed-attempts', '1');
      localStorage.setItem('tmf-attempt-time', now.toString());
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem('tmf-failed-attempts', newAttempts.toString());

      if (newAttempts >= SECURITY_CONFIG.MAX_ATTEMPTS) {
        const lockoutTime = now + SECURITY_CONFIG.LOCKOUT_DURATION_MS;
        setLockoutUntil(lockoutTime);
        localStorage.setItem('tmf-lockout', lockoutTime.toString());
      }
    }

    setError(`Incorrect. ${SECURITY_CONFIG.MAX_ATTEMPTS - failedAttempts - 1} attempts remaining before lockout.`);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    if (step === 'password') {
      setPassword('');
    } else {
      setSecretAnswer('');
    }
  };

  const completeAuthentication = () => {
    const fingerprint = generateFingerprint();
    const sessionData = {
      authenticated: true,
      timestamp: Date.now(),
      fingerprint: fingerprint,
      expiresAt: Date.now() + SECURITY_CONFIG.MAX_SESSION_MS,
    };

    localStorage.setItem('tmf-authenticated', 'true');
    localStorage.setItem('tmf-session', JSON.stringify(sessionData));
    localStorage.setItem('tmf-fingerprint', fingerprint);
    localStorage.removeItem('tmf-failed-attempts');
    localStorage.removeItem('tmf-attempt-time');
    localStorage.removeItem('tmf-lockout');

    onAuthenticate();
  };

  const formatLockoutTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderLockout = () => (
    <div className="auth-card shake">
      <div className="auth-logo">
        <Lock size={64} color="var(--c10)" style={{ margin: '0 auto', display: 'block' }} />
      </div>
      <h1 className="auth-title display-font">Access Temporarily Locked</h1>
      <p className="auth-subtitle handwritten">
        Too many failed login attempts
      </p>
      <div className="lockout-timer">
        <Clock size={32} color="var(--accent)" />
        <span className="timer-display">{formatLockoutTime(lockoutRemaining)}</span>
      </div>
      <p className="auth-hint">
        For security purposes, you must wait before attempting to log in again.
      </p>
    </div>
  );

  const renderPasswordStep = () => (
    <div className={`auth-card ${isShaking ? 'shake' : ''}`}>
      <div className="auth-logo">
        <img src="/mainwebsitelogo.png" alt="Mosaic Logo" className="auth-logo-img" />
      </div>

      <h1 className="auth-title display-font">The Mosaic Foundation</h1>
      {sessionExpired && (
        <p className="auth-subtitle handwritten" style={{ color: 'var(--c10)' }}>
          Session expired for security. Please log in again.
        </p>
      )}
      <p className="auth-subtitle handwritten">Employee Authentication</p>

      <div className="auth-divider">
        <Shield size={24} color="var(--accent)" />
      </div>

      <form onSubmit={handlePasswordSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Employee Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter your employee password"
              className="auth-input"
              autoFocus
              disabled={lockoutUntil && Date.now() < lockoutUntil}
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              disabled={lockoutUntil && Date.now() < lockoutUntil}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary auth-btn"
          disabled={lockoutUntil && Date.now() < lockoutUntil}
        >
          <Lock size={18} style={{ marginRight: '8px' }} />
          Verify Password
        </button>
      </form>

      <div className="security-info">
        <div className="security-badge">
          <Fingerprint size={16} />
          <span>Browser fingerprinting enabled</span>
        </div>
        <div className="security-badge">
          <Shield size={16} />
          <span>2FA verification required</span>
        </div>
      </div>
    </div>
  );

  const renderSecretStep = () => (
    <div className={`auth-card ${isShaking ? 'shake' : ''}`}>
      <div className="auth-logo">
        <img src="/mainwebsitelogo.png" alt="Mosaic Logo" className="auth-logo-img" />
      </div>

      <h1 className="auth-title display-font">Second Verification</h1>
      <p className="auth-subtitle handwritten">Prove you're a team member</p>

      <div className="auth-divider">
        <Fingerprint size={24} color="var(--accent)" />
      </div>

      <form onSubmit={handleSecretSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">{SECURITY_CONFIG.SECRET_QUESTION}</label>
          <input
            type="text"
            value={secretAnswer}
            onChange={(e) => {
              setSecretAnswer(e.target.value);
              setError('');
            }}
            placeholder="Enter your answer"
            className="auth-input"
            autoFocus
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <button type="submit" className="btn btn-primary auth-btn">
          <Shield size={18} style={{ marginRight: '8px' }} />
          Complete Verification
        </button>
      </form>

      <button
        className="btn btn-secondary"
        onClick={() => {
          setStep('password');
          setError('');
          setSecretAnswer('');
        }}
        style={{ marginTop: '16px', width: '100%', background: 'transparent', border: '1px solid var(--border2)' }}
      >
        Back to Password
      </button>
    </div>
  );

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
        {lockoutUntil && Date.now() < lockoutUntil
          ? renderLockout()
          : step === 'password'
            ? renderPasswordStep()
            : renderSecretStep()
        }
      </div>
    </div>
  );
}
