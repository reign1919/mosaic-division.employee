# The Mosaic Foundation — Member Portal

A visually engaging, modern member portal for the Mosaic Foundation NGO, built with React + Vite following a **maximalist zine/street-art/scrapbook aesthetic**.

## Features

- **Authentication Gate**: Uniform password protection for all members
- **Three Divisions Showcase**: 
  - The People's Patch (Humanitarian Welfare)
  - Whiskers & Wings (Animal Welfare)
  - Groves & Petals (Environmental Preservation)
- **Interactive Quiz**: "Find Your Fit" quiz to match users with their ideal division
- **Registration Form**: FormSubmit.co integration for backend-free form submissions
- **Maximalist Design**: Brutalist shadows, scrapbook aesthetics, animated tiles, custom cursor

## Tech Stack

- **Framework**: React 19.2.4 (Vite 8.0.1)
- **Animation**: Framer Motion 12.38.0
- **Icons**: Lucide React 0.577.0
- **Styling**: Vanilla CSS with design tokens

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
mosaic-foundation-member-portal/
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   ├── index.css              # Global design system
│   ├── components/
│   │   ├── AuthGate.jsx       # Password authentication
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Footer.jsx         # Site footer
│   │   ├── CursorTrail.jsx    # Custom cursor
│   │   ├── PageLoader.jsx     # Page transition loader
│   │   ├── DivisionQuiz.jsx   # Interactive quiz
│   │   └── RegistrationForm.jsx # Member registration
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── Divisions.jsx      # Division showcase
│   │   └── Register.jsx       # Registration page
│   └── hooks/
│       └── useScrollReveal.js # Scroll animation hooks
```

## Configuration

### Password

The uniform password is set in `src/components/AuthGate.jsx`:

```javascript
const UNIFORM_PASSWORD = 'mosaic2026';
```

### FormSubmit.co

The registration form submits to:
- **Email**: the.mosaicfoundation.gen@gmail.com
- **Action URL**: https://formsubmit.co/the.mosaicfoundation.gen@gmail.com

## Design System

The design follows a maximalist zine aesthetic with:

- **10-color palette**: Hot Pink, Tangerine, Neon Lime, Deep Violet, Sunshine Yellow, Cyan Electric, and more
- **Brutalist shadows**: Hard-edged, zero-blur shadows (4px 4px 0px)
- **Spring easing**: Bouncy transitions with overshoot
- **Typography**: Outfit (headings), Epilogue (body), Shadows Into Light Two (handwritten)
- **Paper texture overlay**: Subtle noise for tactile feel
- **Dark mode**: Full theme support with toggle

## Pages

1. **Home**: Landing page with hero, quick actions, quote banner, and CTA
2. **Divisions**: Three division cards with descriptions and selection options
3. **Register**: Member registration form with division/activity checkboxes

## Components

- **AuthGate**: Full-screen password authentication
- **Navbar**: Fixed navigation with theme toggle and mobile menu
- **Footer**: Multi-column footer with social links
- **CursorTrail**: Custom cursor with trailing mosaic tiles
- **PageLoader**: Animated page transition with SVG signature
- **DivisionQuiz**: 5-question multiple-choice quiz
- **RegistrationForm**: FormSubmit.co integrated form

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Social Links

- **Instagram**: [@themosaicfoundation_](https://instagram.com/themosaicfoundation_)
- **Email**: the.mosaicfoundation.gen@gmail.com

---

Built with by teens, for the world.
