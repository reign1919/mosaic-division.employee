import { motion } from 'framer-motion';
import { Users, PawPrint, Leaf, ArrowRight } from 'lucide-react';
import { useStaggerReveal } from '../hooks/useScrollReveal';
import './Divisions.css';

const divisions = [
  {
    id: 'peoples-patch',
    name: "The People's Patch",
    formalName: 'Department of Humanitarian Welfare',
    icon: Users,
    color: 'var(--c1)',
    colorName: 'Hot Pink',
    description: "The People's Patch is the department concerned with projects relating to the well-being of individuals and society overall. This is inclusive of but not limited to projects concerning education, poverty and mental health. The intention of this department is to take steps towards bringing everyone to the same level, bridging the gap created by socio-economic circumstances. Through this, we also intend to increase awareness about the issues that humanity faces, both by their own hand and by things out of our control so others may take steps for the same, fulfilling our mission and motto.",
    tiles: [1, 2, 3, 4],
  },
  {
    id: 'whiskers-wings',
    name: 'Whiskers & Wings',
    formalName: 'Department of Animal Welfare',
    icon: PawPrint,
    color: 'var(--c3)',
    colorName: 'Neon Lime',
    description: "Whiskers & Wings is the department concerned with projects relating to the well-being of animals around us. This is inclusive of but not limited to projects concerning feeding drives, shelter visits, and projects pertaining to mistreated animals such as cows and horses. The intention of this department is to help those who cannot speak for themselves, and to ensure that they live as comfortably as possible, as they share the earth with us. Animals living in the city have it considerably worse, especially horses used for rides around monuments and the cows seen on streets. Our objective is to alleviate the suffering of these animals as much as possible.",
    tiles: [3, 4, 5, 6],
  },
  {
    id: 'groves-petals',
    name: 'Groves & Petals',
    formalName: 'Department of Environmental Preservation',
    icon: Leaf,
    color: 'var(--c6)',
    colorName: 'Cyan Electric',
    description: "Groves & Petals is the department concerned with projects relating to the preservation of nature and our environment. This is inclusive of but not limited to clean ups, sapling planting programs, recycling campaigns and projects pertaining to awareness and pollution. The intention of this department is to protect and preserve our environment, for the well-being of both our own and future generations. There is no planet B, so each one of us must do our part in preserving what the Earth gives us. The objective of this department is to build a cleaner environment, and aid in whatever way possible to the achievement of sustainable development.",
    tiles: [6, 7, 8, 9],
  },
];

export default function Divisions({ onTakeQuiz, onSelectDivision }) {
  const containerRef = useStaggerReveal();

  return (
    <div className="divisions-page page-enter">
      {/* Hero */}
      <section className="divisions-hero">
        <div className="floating-tiles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="float-tile"
              style={{
                '--i': i,
                '--x': `${10 + (i * 37) % 80}%`,
                '--y': `${20 + (i * 53) % 60}%`,
                '--size': 30 + (i % 4) * 15,
                '--color': `var(--c${(i % 10) + 1})`,
                '--rotation': (i * 23) % 360,
              }}
            />
          ))}
        </div>

        <div className="container">
          <span className="tag-glow">
            <span className="star">★</span>
            Three Divisions
          </span>
          <h1 className="divisions-title">Find Your Place in the Mosaic</h1>
          <p className="divisions-subtitle handwritten">
            Each piece matters. Each voice counts.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onTakeQuiz}>
              <PawPrint size={18} />
              Find Your Fit
            </button>
          </div>
        </div>
      </section>

      {/* Divisions Grid */}
      <section className="divisions-section section">
        <div className="container" ref={containerRef}>
          <div className="divisions-grid">
            {divisions.map((div, index) => (
              <motion.div
                key={div.id}
                className="division-card reveal-child"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
                whileHover={{
                  y: -8,
                  rotate: index % 2 === 0 ? '-1deg' : '1deg',
                }}
              >
                <div
                  className="card-top-bar"
                  style={{ backgroundColor: div.color }}
                />

                <div className="card-icon-wrapper">
                  <div
                    className="card-icon-bg"
                    style={{
                      backgroundColor: `${div.color}20`,
                      borderColor: div.color,
                    }}
                  >
                    <img 
                      src={`/${div.id === 'peoples-patch' ? 'peoplespatch.png' : div.id === 'whiskers-wings' ? 'whiskersnwings.png' : 'grovesnpetals.png'}`} 
                      alt={div.name} 
                      className="division-logo-img" 
                    />
                  </div>
                </div>

                <div className="card-tape tape tape-tl" />

                <h3 className="division-name display-font">{div.name}</h3>
                <p className="division-formal mono">{div.formalName}</p>

                <div className="division-visual">
                  <div className="mini-tiles">
                    {div.tiles.map((t) => (
                      <div
                        key={t}
                        className="mini-tile"
                        style={{
                          backgroundColor: `var(--c${t})`,
                          animationDelay: `${t * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p className="division-description">{div.description}</p>

                <button
                  className="btn-select"
                  onClick={() => onSelectDivision(div.id)}
                >
                  Select This Division
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="divisions-cta section">
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

            <h2 className="cta-title">Still Not Sure?</h2>
            <p className="cta-subtitle handwritten">
              Take our quick quiz to discover which division aligns with your passions!
            </p>

            <button className="btn btn-primary btn-lg" onClick={onTakeQuiz}>
              Take the Quiz
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
