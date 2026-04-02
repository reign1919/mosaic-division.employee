import { motion } from 'framer-motion';
import './PageLoader.css';

export default function PageLoader() {
  return (
    <div className="page-loader">
      {/* Background Tile Grid */}
      <div className="loader-grid">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="loader-tile"
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.03, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              backgroundColor: `var(--c${(i % 10) + 1})`,
              '--i': i,
            }}
          />
        ))}
      </div>

      {/* Mosaic Signature */}
      <svg className="loader-signature" viewBox="0 0 400 120">
        <defs>
          {[...Array(6)].map((_, i) => (
            <linearGradient key={i} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`var(--c${(i % 10) + 1})`} />
              <stop offset="100%" stopColor={`var(--c${((i + 3) % 10) + 1})`} />
            </linearGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ghost letters */}
        {[...Array(6)].map((_, i) => (
          <text
            key={`ghost-${i}`}
            x={40 + i * 60}
            y="80"
            fontSize="60"
            fontFamily="cursive"
            fill="var(--text)"
            opacity="0.05"
            textAnchor="middle"
          >
            {['M', 'o', 's', 'a', 'i', 'c'][i]}
          </text>
        ))}

        {/* Main letters with stroke animation */}
        <motion.path
          d="M 20 90 L 40 30 L 60 90 M 25 75 L 55 75"
          fill="none"
          stroke="url(#grad-0)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.path
          d="M 95 50 Q 95 30 110 30 Q 125 30 125 50 Q 125 70 110 70 Q 95 70 95 50"
          fill="none"
          stroke="url(#grad-1)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.32 }}
        />
        <motion.path
          d="M 145 50 Q 145 30 160 30 Q 175 30 175 50 L 175 70 Q 175 90 160 90 Q 145 90 145 70"
          fill="none"
          stroke="url(#grad-2)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.44 }}
        />
        <motion.path
          d="M 195 50 Q 195 30 210 30 Q 225 30 225 50 Q 225 70 210 70 Q 195 70 195 50"
          fill="none"
          stroke="url(#grad-3)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.56 }}
        />
        <motion.circle
          cx="240"
          cy="40"
          r="6"
          fill="var(--c5)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7, type: 'spring' }}
        />
        <motion.path
          d="M 260 50 Q 260 30 275 30 Q 290 30 290 50 Q 290 70 275 70 Q 260 70 260 50"
          fill="none"
          stroke="url(#grad-4)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.68 }}
        />
      </svg>

      {/* Animated Underline */}
      <motion.div
        className="loader-underline"
        initial={{ width: 0 }}
        animate={{ width: 240 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />

      {/* Bouncing Tiles */}
      <div className="loader-bounce-row">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bounce-${i}`}
            className="bounce-tile"
            initial={{ scale: 0, rotate: -15 }}
            animate={{
              scale: 1,
              rotate: [0, 5, -5, 0],
              y: [0, -8, 0],
            }}
            transition={{
              scale: { delay: i * 0.08 + 0.3, duration: 0.3, type: 'spring' },
              rotate: { delay: i * 0.08 + 0.6, duration: 0.8, repeat: Infinity },
              y: { delay: i * 0.08 + 0.6, duration: 0.8, repeat: Infinity },
            }}
            style={{ backgroundColor: `var(--c${(i % 10) + 1})` }}
          />
        ))}
      </div>
    </div>
  );
}
