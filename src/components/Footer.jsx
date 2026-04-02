import { Instagram, Mail, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer({ setPage }) {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/themosaicfoundation_', label: '@themosaicfoundation_' },
    { icon: Mail, href: 'mailto:the.mosaicfoundation.gen@gmail.com', label: 'Email us' },
  ];

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Divisions', page: 'divisions' },
    { label: 'Quiz', page: 'quiz' },
    { label: 'Register', page: 'register' },
  ];

  const programs = [
    'Education Support',
    'Mental Health',
    'Animal Feeding',
    'Shelter Visits',
    'Tree Planting',
    'Clean-up Drives',
  ];

  const getInvolved = [
    'Volunteer',
    'Donate',
    'Partner',
    'Intern',
    'Spread the Word',
  ];

  return (
    <footer className="footer">
      <div className="color-strip" />

      <div className="footer-ambient" />

      <div className="footer-container container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/mainwebsitelogo.png" alt="Mosaic Logo" className="footer-logo-img" />
            </div>
            <h3 className="footer-name display-font">The Mosaic</h3>
            <p className="footer-tagline handwritten">Built by youth, for the world.</p>

            <div className="social-links">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="social-btn"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate Column */}
          <div className="footer-nav">
            <h4 className="footer-title">Navigate</h4>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <button onClick={() => setPage(link.page)}>
                    <span className="link-arrow">→</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} The Mosaic Foundation. Made with <Heart size={14} fill="var(--c1)" color="var(--c1)" /> by teens.
          </p>
        </div>
      </div>
    </footer>
  );
}
