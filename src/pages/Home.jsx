import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useStaggerReveal } from '../hooks/useScrollReveal';
import './Home.css';

export default function Home({ setPage }) {
  const containerRef = useStaggerReveal();

  const quickLinks = [
    { label: 'Explore Divisions', page: 'divisions', color: 'var(--c1)' },
    { label: 'Take the Quiz', page: 'quiz', color: 'var(--c3)' },
    { label: 'Register Now', page: 'register', color: 'var(--c6)' },
  ];

  return (
    <div className="home-page page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-tiles">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="hero-tile"
              style={{
                '--i': i,
                '--x': `${(i * 37) % 100}%`,
                '--y': `${(i * 53) % 100}%`,
                '--size': 30 + (i % 6) * 15,
                '--color': `var(--c${(i % 10) + 1})`,
                '--rotation': (i * 23) % 360,
              }}
            />
          ))}
        </div>

        <div className="container">
          <div className="hero-content">
            <span className="tag-glow">
              <span className="star">★</span>
              Built by Teens
            </span>

            <h1 className="hero-title">
              Every piece{' '}
              <span className="handwritten" style={{ color: 'var(--accent)' }}>
                matters.
              </span>{' '}
              Every voice{' '}
              <span className="handwritten" style={{ color: 'var(--c3)' }}>
                counts.
              </span>
            </h1>

            <p className="hero-subtitle">
              The Mosaic Foundation is a youth-driven nonprofit where diverse stories,
              passions, and talents come together to create meaningful change.
              Join us in building a better world — one piece at a time.
            </p>

            <div className="hero-cta">
              <button
                className="btn btn-primary"
                onClick={() => setPage('divisions')}
              >
                Explore Divisions
                <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setPage('register')}
              >
                Join Us
                <Sparkles size={18} />
              </button>
            </div>

            <p className="hero-annotation handwritten">
              ↙ we're just teens doing big things!
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions section">
        <div className="container" ref={containerRef}>
          <div className="actions-grid">
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.page}
                className="action-card reveal-child"
                style={{ '--color': link.color }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: 'spring',
                }}
                onClick={() => setPage(link.page)}
              >
                <div
                  className="action-icon-bg"
                  style={{
                    backgroundColor: `${link.color}20`,
                    borderColor: link.color,
                  }}
                >
                  {index === 0 && <Heart size={32} color={link.color} />}
                  {index === 1 && <Sparkles size={32} color={link.color} />}
                  {index === 2 && <ArrowRight size={32} color={link.color} />}
                </div>
                <span className="action-label">{link.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-bg-tiles">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="cta-tile"
                  style={{
                    '--i': i,
                    '--x': `${(i * 31) % 100}%`,
                    '--y': `${(i * 47) % 100}%`,
                    '--color': `var(--c${(i % 10) + 1})`,
                  }}
                />
              ))}
            </div>

            <h2 className="cta-title">Ready to Add Your Piece?</h2>
            <p className="cta-subtitle handwritten">
              The mosaic isn't complete without you.
            </p>

            <div className="cta-buttons">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setPage('register')}
              >
                Register Now
                <ArrowRight size={20} />
              </button>
              <button
                className="btn btn-ghost btn-lg"
                onClick={() => setPage('divisions')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
