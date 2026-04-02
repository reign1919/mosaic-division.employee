import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import AuthGate from './components/AuthGate';
import DivisionQuiz from './components/DivisionQuiz';
import Home from './pages/Home';
import Divisions from './pages/Divisions';
import Register from './pages/Register';
import './App.css';

const PAGES = {
  home: Home,
  divisions: Divisions,
  quiz: () => null, // Quiz is shown as modal
  register: Register,
};

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [preselectedDivision, setPreselectedDivision] = useState(null);

  // Load theme and auth from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('tmf-theme');
    const savedAuth = localStorage.getItem('tmf-authenticated');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(true); // Default to dark
    }

    if (savedAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

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
    localStorage.setItem('tmf-authenticated', 'true');
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
        <AuthGate onAuthenticate={handleAuthenticate} />
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
