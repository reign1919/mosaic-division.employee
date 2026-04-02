import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const PAGES = ['home', 'divisions', 'quiz', 'register'];

export default function Navbar({ page, setPage, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navigate = (newPage) => {
    setPage(newPage);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="color-strip" />

      <div className="nav-container">
        {/* Logo */}
        <button className="logo" onClick={() => navigate('home')}>
          <img src="/mainwebsitelogo.png" alt="Mosaic Logo" className="logo-img" />
          <div className="logo-text">
            <span className="logo-name display-font">The Mosaic</span>
            <span className="logo-sub handwritten">foundation ✦</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="nav-links">
          {PAGES.filter(p => p !== 'quiz').map((p) => (
            <button
              key={p}
              className={`nav-link ${page === p ? 'active' : ''}`}
              onClick={() => navigate(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {PAGES.map((p) => (
            <button
              key={p}
              className={`mobile-link ${page === p ? 'active' : ''}`}
              onClick={() => navigate(p)}
            >
              <span className="link-arrow">→</span>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
