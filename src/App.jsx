import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import AuthGate from './components/AuthGate';
import DivisionQuiz from './components/DivisionQuiz';
import Home from './pages/Home';
import Divisions from './pages/Divisions';
import Register from './pages/Register';
import './App.css';

// Security configuration (must match AuthGate)
const SECURITY_CONFIG = {
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes inactivity
  MAX_SESSION_MS: 8 * 60 * 60 * 1000, // 8 hours absolute
};

const PAGES = {
  home: Home,
  divisions: Divisions,
  quiz: () => null,
  register: Register,
};

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [preselectedDivision, setPreselectedDivision] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const activityTimerRef = useRef(null);
  const sessionCheckRef = useRef(null);

  // Generate and compare browser fingerprint
  const validateFingerprint = () => {
    const storedFingerprint = localStorage.getItem('tmf-fingerprint');
    if (!storedFingerprint) return false;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);

    const currentFingerprint = {
      ua: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvasHash: canvas.toDataURL().slice(0, 100),
    };

    const currentHash = btoa(JSON.stringify(currentFingerprint)).slice(0, 64);
    return currentHash === storedFingerprint;
  };

  // Validate session
  const validateSession = () => {
    const sessionData = localStorage.getItem('tmf-session');
    if (!sessionData) return false;

    try {
      const session = JSON.parse(sessionData);

      // Check absolute session expiry
      if (Date.now() > session.expiresAt) {
        return false;
      }

      // Check inactivity timeout
      if (Date.now() - session.timestamp > SECURITY_CONFIG.SESSION_TIMEOUT_MS) {
        return false;
      }

      // Validate fingerprint
      if (!validateFingerprint()) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  };

  // Clear session and logout
  const handleSessionExpired = () => {
    localStorage.removeItem('tmf-authenticated');
    localStorage.removeItem('tmf-session');
    localStorage.removeItem('tmf-fingerprint');
    setAuthenticated(false);
    setSessionExpired(true);
  };

  // Reset activity timer
  const resetActivityTimer = () => {
    if (activityTimerRef.current) {
      clearTimeout(activityTimerRef.current);
    }

    activityTimerRef.current = setTimeout(() => {
      if (!validateSession()) {
        handleSessionExpired();
      }
    }, SECURITY_CONFIG.SESSION_TIMEOUT_MS);

    // Update session timestamp
    const sessionData = localStorage.getItem('tmf-session');
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        session.timestamp = Date.now();
        localStorage.setItem('tmf-session', JSON.stringify(session));
      } catch {}
    }
  };

  // Load theme and auth from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('tmf-theme');
    const savedAuth = localStorage.getItem('tmf-authenticated');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(true);
    }

    if (savedAuth === 'true' && validateSession()) {
      setAuthenticated(true);
      resetActivityTimer();

      // Periodic session check
      sessionCheckRef.current = setInterval(() => {
        if (!validateSession()) {
          handleSessionExpired();
        }
      }, 60000); // Check every minute
    }
  }, []);

  // Track user activity
  useEffect(() => {
    if (!authenticated) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => resetActivityTimer();

    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (activityTimerRef.current) {
        clearTimeout(activityTimerRef.current);
      }
      if (sessionCheckRef.current) {
        clearInterval(sessionCheckRef.current);
      }
    };
  }, [authenticated]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('tmf-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navigate = (newPage) => {
    if (newPage === 'quiz') {
      setShowQuiz(true);
      return;
    }

    if (newPage === page) return;

    setLoading(true);
    setTimeout(() => {
      setPage(newPage);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  const handleAuthenticate = () => {
    setAuthenticated(true);
    setSessionExpired(false);

    // Start session checks
    resetActivityTimer();
    sessionCheckRef.current = setInterval(() => {
      if (!validateSession()) {
        handleSessionExpired();
      }
    }, 60000);
  };

  const handleTakeQuiz = () => {
    setShowQuiz(true);
  };

  const handleSelectDivision = (divisionId) => {
    setPreselectedDivision(divisionId);
    setShowQuiz(false);
    navigate('register');
  };

  // Show auth gate if not authenticated
  if (!authenticated) {
    return (
      <>
        <AuthGate onAuthenticate={handleAuthenticate} sessionExpired={sessionExpired} />
      </>
    );
  }

  const PageComponent = PAGES[page] || Home;

  return (
    <div className="app">
      {loading && <PageLoader />}

      <Navbar
        page={page}
        setPage={navigate}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        {page === 'home' && <Home setPage={navigate} />}

        {page === 'divisions' && (
          <Divisions
            onTakeQuiz={handleTakeQuiz}
            onSelectDivision={handleSelectDivision}
          />
        )}

        {page === 'register' && (
          <Register preselectedDivision={preselectedDivision} />
        )}
      </main>

      <Footer setPage={navigate} />

      {showQuiz && (
        <DivisionQuiz
          onClose={() => setShowQuiz(false)}
          onSelectDivision={handleSelectDivision}
        />
      )}
    </div>
  );
}
