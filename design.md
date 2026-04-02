# The Mosaic Foundation — Website

> A youth-driven nonprofit website built with a **maximalist zine/street-art/scrapbook aesthetic** — bold, loud, and unapologetically teenage. Every pixel is intentional, every animation tells a story.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design Philosophy](#design-philosophy)
- [Design System & Tokens](#design-system--tokens)
  - [Color Palette](#color-palette)
  - [Typography](#typography)
  - [Spacing & Layout](#spacing--layout)
  - [Shadows — Brutalist System](#shadows--brutalist-system)
  - [Transitions & Easings](#transitions--easings)
  - [Dark Mode](#dark-mode)
- [Global Styles & Textures](#global-styles--textures)
  - [Paper Texture Overlay](#paper-texture-overlay)
  - [Custom Scrollbar](#custom-scrollbar)
  - [Form Elements](#form-elements)
- [Reusable CSS Primitives](#reusable-css-primitives)
  - [Tag Stickers (`.tag-glow`, `.tag`)](#tag-stickers)
  - [Buttons (`.btn`)](#buttons)
  - [Pill Tags (`.pill`)](#pill-tags)
  - [Glow Cards (`.glow-card`)](#glow-cards)
  - [Mosaic Divider](#mosaic-divider)
  - [Tape Decorators (`.tape`)](#tape-decorators)
  - [Scrapbook Arrows](#scrapbook-arrows)
  - [Section Utilities](#section-utilities)
- [Scroll & Reveal Animations](#scroll--reveal-animations)
  - [`useScrollReveal` Hook](#usescrollreveal-hook)
  - [`useStaggerReveal` Hook](#usestaggerreveal-hook)
  - [Page Enter Animation](#page-enter-animation)
- [Components](#components)
  - [MosaicIntro — First-Load Splash](#mosaicintro--first-load-splash)
  - [PageLoader — Route Transition](#pageloader--route-transition)
  - [Navbar](#navbar)
  - [Footer](#footer)
  - [CursorTrail — Custom Cursor](#cursortrail--custom-cursor)
  - [Marquee — Infinite Scrolling Ticker](#marquee--infinite-scrolling-ticker)
  - [MosaicCanvas — Interactive Tile Grid](#mosaiccanvas--interactive-tile-grid)
  - [StopMotionMosaic — 3D Rotating Cube Art](#stopmotionmosaic--3d-rotating-cube-art)
  - [Scroll3DWrapper — Scroll-Linked 3D Tilt](#scroll3dwrapper--scroll-linked-3d-tilt)
  - [CenterRevealWrapper — Clip-Path Scroll Reveal](#centerrevealwrapper--clip-path-scroll-reveal)
- [Pages](#pages)
  - [Home](#home)
  - [About](#about)
  - [Our Work](#our-work)
  - [Programs](#programs)
  - [Get Involved](#get-involved)
  - [Blog](#blog)
  - [Contact](#contact)
- [Routing & Navigation](#routing--navigation)
- [Theme System](#theme-system)
- [Responsive Design](#responsive-design)
- [Performance Considerations](#performance-considerations)
- [SEO](#seo)
- [Getting Started](#getting-started)

---

## Overview

The Mosaic Foundation website is a **single-page application (SPA)** for a teen-led nonprofit. It eschews conventional corporate NGO aesthetics in favor of a **maximalist, zine-inspired, scrapbook-style** design language: hard-edged brutalist shadows, tape-strip decorations, handwritten typography, vivid clashing colors, and pervasive micro-animations that make the interface feel alive, tactile, and youthful.

The site contains **7 pages** (Home, About, Our Work, Programs, Get Involved, Blog, Contact), a **full-screen mosaic intro animation**, **custom cursor with trailing tiles**, and **page-transition loaders** with hand-drawn SVG calligraphy.

---

## Tech Stack

| Layer         | Technology               | Version   |
| ------------- | ------------------------ | --------- |
| **Framework** | React                    | 19.2.4    |
| **Bundler**   | Vite                     | 8.0.1     |
| **Animation** | Framer Motion            | 12.38.0   |
| **Icons**     | Lucide React             | 0.577.0   |
| **Styling**   | Vanilla CSS (no Tailwind)| —         |
| **Language**   | JavaScript (JSX)        | ES2022+   |
| **Fonts**     | Google Fonts (Outfit, Epilogue, Shadows Into Light Two) | — |

No routing library is used — navigation is handled via **state-based page swapping** with a custom `navigate` function in `App.jsx`.

---

## Project Structure

```
mosaic-foundation-site/
├── index.html                  # Entry HTML with meta, favicon, font preconnects
├── vite.config.js              # Vite + React plugin config
├── package.json                # Dependencies & scripts
├── public/
│   ├── favicon.svg             # Mosaic tile favicon
│   └── icons.svg               # Shared SVG icons
├── src/
│   ├── main.jsx                # React DOM root mount
│   ├── App.jsx                 # Root component — intro, routing, theme, layout
│   ├── App.css                 # (Empty — all styles in index.css + component CSS)
│   ├── index.css               # ★ Global design system: tokens, reset, primitives
│   ├── assets/
│   │   ├── hero.png            # Hero image asset
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── hooks/
│   │   └── useScrollReveal.js  # IntersectionObserver-based reveal hooks
│   ├── components/
│   │   ├── MosaicIntro.jsx     # Full-screen canvas splash (build → hold → shatter)
│   │   ├── PageLoader.jsx/.css # Route-transition loader with SVG "Mosaic" signature
│   │   ├── Navbar.jsx/.css     # Fixed nav with logo tiles, sticker-tab links, dark toggle
│   │   ├── Footer.jsx/.css     # 4-column footer with 9-tile animated logo, social links
│   │   ├── CursorTrail.jsx/.css# Custom cursor ring + trailing mosaic tiles + click sparkles
│   │   ├── Marquee.jsx/.css    # Infinite horizontal scroller with gradient text
│   │   ├── MosaicCanvas.jsx    # Interactive 8×8 HTML Canvas tile grid with click ripple
│   │   ├── StopMotionMosaic.jsx# 3D rotating cube mosaic at 8 FPS stop-motion
│   │   ├── Scroll3DWrapper.jsx # Framer Motion scroll-linked 3D perspective wrapper
│   │   └── CenterRevealWrapper.jsx # Framer Motion center-expanding clip-path reveal
│   └── pages/
│       ├── PageShared.css      # Shared hero + section-title styles for interior pages
│       ├── Home.jsx/.css       # Hero, causes, quote banner, testimonials, CTA
│       ├── About.jsx/.css      # Origin story, timeline, values, team grid
│       ├── Work.jsx/.css       # Project cards with glare effect
│       ├── Programs.jsx/.css   # 6 program detail cards with enrollment badges
│       ├── Involved.jsx/.css   # Ways to help, donation tiers, FAQ accordion
│       ├── Blog.jsx/.css       # Featured article, blog grid, newsletter signup
│       └── Contact.jsx/.css    # Contact form, info sidebar, embedded MosaicCanvas
```

---

## Design Philosophy

The design is built on five core principles:

1. **Maximalist Scrapbook Aesthetic** — The site looks like a hand-assembled zine: tape strips, rotated elements, handwritten annotations, hard shadows, and a deliberate "imperfect" feel. Nothing is pixel-perfect on purpose.

2. **Brutalist Interactivity** — Hover effects don't just fade — they *shove* elements sideways with hard box-shadows (`4px 4px 0px`), rotate them, and scale them. Buttons feel like physical stickers you're pressing.

3. **Pervasive Micro-Animations** — Almost every element has movement: floating background tiles, wobbling logo squares, pulsing footer tiles, spinning star decorators, bouncing divider bars, and parallax tilt on mouse-move.

4. **Youth-Forward Voice** — Handwritten cursive annotations (`.handwritten` class) appear next to formal headings, simulating a teenager scribbling on a printed page. Copy is casual and direct.

5. **Mosaic as Metaphor** — The tile/mosaic motif appears at every layer: the logo is a 2×2 tile grid, the favicon is four colored squares, the intro animation builds/shatters a tile grid, the interactive canvas lets users repaint tiles, the 3D rotating artwork is a cube mosaic, dividers are animated colored blocks, and the page loader background is a tile grid.

---

## Design System & Tokens

All design tokens live in `src/index.css` under the `:root` selector.

### Color Palette

The palette is deliberately **loud and clashing** — it's a maximalist system, not a harmonious one.

| Token   | Value      | Name / Usage                                   |
| ------- | ---------- | ---------------------------------------------- |
| `--bg`  | `#fdf6ec`  | Primary background (warm cream)                |
| `--bg2` | `#fff1d6`  | Secondary background (section alternation)     |
| `--bg3` | `#ffe9be`  | Tertiary background (footer, deeper sections)  |
| `--surface`  | `#ffffff` | Card/component surface                      |
| `--surface2` | `#fff8ef` | Subtle surface variation                    |
| `--surface3` | `#fff3e3` | Deeper surface variation                    |
| `--text`     | `#1a0536` | Primary text (near-black violet)            |
| `--text2`    | `#4a2d6e` | Secondary text (muted purple)               |
| `--text3`    | `#8b6aaa` | Tertiary text (light purple)                |
| `--border`   | `rgba(90,20,120,0.12)` | Subtle borders                 |
| `--border2`  | `rgba(90,20,120,0.22)` | Emphasized borders              |

**Maximalist Accent Colors (10-color system):**

| Token  | Value      | Name              |
| ------ | ---------- | ----------------- |
| `--c1` | `#ff2d7b`  | Hot Pink           |
| `--c2` | `#ff6b35`  | Tangerine          |
| `--c3` | `#b8ff00`  | Neon Lime          |
| `--c4` | `#6c2bd9`  | Deep Violet        |
| `--c5` | `#ffe14d`  | Sunshine Yellow    |
| `--c6` | `#00d4ff`  | Cyan Electric      |
| `--c7` | `#1a0536`  | Ink Black-Violet   |
| `--c8` | `#ff9ee7`  | Bubblegum Pink     |
| `--c9` | `#7bffb2`  | Mint Neon          |
| `--c10`| `#ff4444`  | Cherry Red         |

**Semantic aliases:**
- `--accent` → `#ff2d7b` (Hot Pink — primary action color)
- `--accent2` → `#b8ff00` (Neon Lime — secondary accent)

### Typography

Three font families create a layered typographic voice:

| Class / Selector | Font Family              | Weight | Role                                    |
| ---------------- | ------------------------ | ------ | --------------------------------------- |
| `h1–h4`, `.display-font` | **Outfit**      | 800    | Headlines, section titles, logo name    |
| `body`, `.mono`, `.btn` | **Epilogue**     | 400–700| Body text, UI labels, buttons, nav links|
| `.handwritten`   | **Shadows Into Light Two** | 700  | Cursive annotations, subtitles, quotes  |

- Headings use `text-transform: uppercase` and tight `letter-spacing: -0.02em`
- The `.mono` utility class uses Epilogue with `letter-spacing: 0.06em` and `text-transform: uppercase` for a monospaced-feeling label
- Body line-height is `1.6`; heading line-height is `1.1`

### Spacing & Layout

| Token        | Value     | Usage                          |
| ------------ | --------- | ------------------------------ |
| `--nav-h`    | `78px`    | Navbar height                  |
| `--r`        | `12px`    | Default border-radius          |
| `--r-lg`     | `20px`    | Large border-radius            |
| `.section`   | `padding: 100px 0` | Vertical section spacing |
| `.container` | `max-width: 1220px; padding: 0 28px` | Content width container |

### Shadows — Brutalist System

The shadow system uses **zero-blur, offset-only shadows** for a hand-printed, stamped sticker effect:

| Token                    | Value                              | Usage                       |
| ------------------------ | ---------------------------------- | ----------------------------|
| `--shadow-brutal`        | `4px 4px 0px var(--c7)`            | Standard brutalist shadow   |
| `--shadow-brutal-sm`     | `2px 2px 0px var(--c7)`            | Small/subtle shadow         |
| `--shadow-brutal-lg`     | `6px 6px 0px var(--c7)`            | Large/hover shadow          |
| `--shadow-brutal-accent` | `4px 4px 0px var(--accent)`        | Accent-colored shadow       |

On hover, elements often shift from `--shadow-brutal` to `--shadow-brutal-lg` while translating `-2px, -2px` — simulating a sticker being "lifted" off the page.

### Transitions & Easings

| Token           | Value                                    | Character          |
| --------------- | ---------------------------------------- | -------------------|
| `--transition`  | `0.28s cubic-bezier(0.4,0,0.2,1)`       | Smooth, standard   |
| `--spring`      | `0.5s cubic-bezier(0.34,1.56,0.64,1)`   | Bouncy, overshoot  |

The **spring easing** is the signature easing — it's used on nav links, buttons, cards, the theme toggle, and virtually every interactive element. The overshoot (`1.56` control point) gives everything a "snap into place" feel.

### Dark Mode

Dark mode is toggled via `data-theme="dark"` on the `<html>` element. Every token is remapped:

| Token      | Light           | Dark            |
| ---------- | --------------- | --------------- |
| `--bg`     | `#fdf6ec`       | `#0a0418`       |
| `--bg2`    | `#fff1d6`       | `#120824`       |
| `--bg3`    | `#ffe9be`       | `#1a0e30`       |
| `--surface`| `#ffffff`       | `#150a28`       |
| `--text`   | `#1a0536`       | `#f0e8ff`       |
| `--text2`  | `#4a2d6e`       | `#c8b0e8`       |

Dark mode also adds:
- **Ambient radial gradient meshes** behind sections (subtle violet/cyan/pink glows)
- **Text-shadow glow** on stat numbers (`text-shadow: 0 0 16px currentColor`)
- **Card gradient backgrounds** (`linear-gradient(160deg, surface → surface2)`)
- Brutalist shadows shift to semi-transparent purple (`rgba(180,0,255,0.3)`)
- Paper texture overlay switches from `mix-blend-mode: multiply` to `overlay`

---

## Global Styles & Textures

### Paper Texture Overlay

A **full-viewport SVG noise texture** is overlaid on the entire page via `body::after`:

```css
body::after {
  /* fractalNoise SVG filter — gives a subtle paper grain */
  opacity: 0.035;          /* Light mode: barely visible */
  mix-blend-mode: multiply;
  pointer-events: none;
  z-index: 99997;          /* Above content, below cursor */
}
```

This creates a tactile "printed on paper" quality across the entire site. In dark mode, opacity increases to `0.04` and blend mode switches to `overlay`.

### Custom Scrollbar

The scrollbar itself is styled with the brand palette:

- **Track:** `var(--bg2)` (cream/dark purple)
- **Thumb:** `linear-gradient(to bottom, var(--c1), var(--c4))` — a Hot Pink → Deep Violet gradient
- 4px border-radius, 2px border in track color

### Form Elements

All `input`, `textarea`, and `select` elements share a unified treatment:

- Surface-colored background (`var(--surface2)`)
- 2px border with `var(--border2)`
- On focus: border turns `var(--accent)`, background whitens, and a brutalist accent shadow appears
- `select` elements have a custom SVG chevron arrow
- Font: Epilogue at 14.5px

---

## Reusable CSS Primitives

### Tag Stickers

**`.tag-glow`** — The primary section label. Appears at the top of every content section.

- Inline-flex with star icon (`★`) that spins infinitely
- Accent-colored border with tinted background via `color-mix()`
- Brutalist small shadow, slight `-1deg` rotation
- Hover: rotates `+1deg` and scales `1.05`
- Font: Shadows Into Light Two (cursive), 13px, 700 weight

**`.tag`** — A simpler legacy variant with an em-dash prefix instead of a star.

### Buttons

The `.btn` class creates **chunky, sticker-style buttons**:

- 14px × 28px padding, 10px border-radius
- Epilogue font, 14px, 700 weight, uppercase
- 2.5px solid `var(--c7)` border
- Hover: translates `-2px, -2px` (lift effect)
- Active: translates `+1px, +1px` (press-down)

**`.btn-primary`:** Accent background, white text, brutalist shadow. Hover expands shadow to `6px 6px`.

**`.btn-outline`:** White background, dark border. Hover turns border and text accent-colored with accent shadow.

### Pill Tags

`.pill` elements use the cursive font at 13px with brutalist small shadows and **alternating slight rotations** (`-1deg` for odd, `+1.5deg` for even) via CSS custom property `--rot`. Hover resets rotation and scales `1.08`.

### Glow Cards

`.glow-card` is a generic wrapper that adds brutalist shadow + lift on hover (`translate(-2px, -2px)`).

### Mosaic Divider

A 10-span flex container where each `<span>` gets a different accent color and a `scaleY` bounce animation with staggered delays. Creates a colorful "equalizer bar" separator between sections.

### Tape Decorators

`.tape` elements simulate **masking tape** strips pinned to cards:

- 60×20px, semi-transparent yellow (`rgba(255,225,77,0.7)`)
- `.tape-tl`: Top-left, rotated -8°
- `.tape-tr`: Top-right, rotated +12°

Used on cause cards, team cards, and testimonial cards for a hand-assembled scrapbook feel.

### Scrapbook Arrows

`.scrapbook-arrow` uses the cursive font with absolute positioning and CSS custom properties for rotation. Creates handwritten-style annotations pointing at elements.

### Section Utilities

- `.section` — 100px vertical padding
- `.container` — 1220px max-width, 28px horizontal padding
- `.section-title-centered` — Responsive clamp sizing, centered, uppercase
- `.section-sub` — Centered subtitle in cursive font, muted color

---

## Scroll & Reveal Animations

### `useScrollReveal` Hook

Located in `src/hooks/useScrollReveal.js`. Uses `IntersectionObserver` with a `0.12` visibility threshold.

- Returns a `ref` to attach to any element
- When the element enters the viewport, it adds the `.revealed` class
- Observer disconnects after first reveal (one-time animation)
- Elements start at `opacity: 0; transform: translateY(32px)` and spring to `opacity: 1; transform: translateY(0)` using the spring easing

### `useStaggerReveal` Hook

Same file. Attaches to a **container** element and stagger-reveals all children with class `.reveal-child`:

- Each child gets `.revealed` added with an `80ms` delay between siblings
- Creates a cascade/waterfall entrance effect on card grids

### Page Enter Animation

Every page root uses the `.page-enter` class:

```css
@keyframes pageSlap {
  0%   { opacity: 0; transform: scale(0.92) rotate(-1deg); }
  60%  { opacity: 1; transform: scale(1.02) rotate(0.5deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
```

This "sticker slap" animation makes each page scale up with a slight rotation overshoot, as if being slapped onto a surface.

---

## Components

### MosaicIntro — First-Load Splash

**File:** `src/components/MosaicIntro.jsx`

A **full-screen HTML5 Canvas animation** that plays once on the very first page load. Three phases:

1. **Build Phase** — A 12×8 grid of colored tiles "snap in" one by one with random delays. Each tile uses a stop-motion frame-stepping approach (no smooth interpolation — jumps between scale frames at 30ms intervals). Tiles have slight permanent rotations and 2px stroke borders. Once 40% built, the "THE MOSAIC" logo text fades in with a brutalist hard shadow, and the subtitle "FOUNDATION ✦ BUILT BY YOUTH" appears in cursive.

2. **Hold Phase** — All tiles and text hold steady for 1000ms.

3. **Shatter Phase** — Tiles scatter outward with random velocity vectors (`vx`, `vy`), angular rotation, and gravity simulation (`0.0005 * el²`). Opacity fades quadratically. Once all tiles are gone, `onDone()` fires and the canvas fades out.

**Color palette:** Uses the 10-color maximalist palette (`--c1` through `--c10` plus extra shades).

**Canvas rendering:** Direct 2D context drawing — no WebGL. Uses `requestAnimationFrame` for all phases.

### PageLoader — Route Transition

**Files:** `src/components/PageLoader.jsx` + `PageLoader.css`

Displays during the 900ms page transition (simulated loading time). Contains:

1. **Background tile grid** — 5×4 grid of 20 tiles with staggered "sticker slap" animations (scale from 0 + rotate -15° → land at full size).

2. **Hand-crafted SVG "Mosaic" signature** — 6 individual `<path>` elements spelling out "Mosaic" in cursive, each with:
   - Unique SVG path data (M, o, s, a, i, c)
   - `stroke-dasharray` / `stroke-dashoffset` animation for a "drawing" effect
   - Per-letter `linearGradient` fills (each letter is a different accent color)
   - Gaussian blur glow filter
   - Staggered start delays (120ms between letters)
   - Ghost baseline and ghost letter outlines (very faint guides at 5% opacity)

3. **Dot for "i"** — A `<circle>` that scale-bounces in with the spring easing after the "i" stroke completes.

4. **Animated underline** — A gradient bar that grows from 0 to 240px width with a 0.6s delay.

5. **Bouncing tile row** — 6 small colored squares that slap in and then continuously bounce with staggered timing.

### Navbar

**Files:** `src/components/Navbar.jsx` + `Navbar.css`

Fixed-position navigation bar with:

- **Zigzag color strip** — 5px tall repeating `linear-gradient` across the top in 5 accent colors (30px segments each)
- **Scroll state** — When `scrollY > 20`, adds backdrop blur, `color-mix` semi-transparent background, and a 3px solid bottom border
- **Logo** — 2×2 grid of 4 animated tiles (wobble keyframe with rotation/scale) + "The Mosaic" in Outfit 800 + "foundation ✦" in cursive. Hover: rotates -3° and scales 1.06
- **Desktop nav links** — Styled as "sticker tabs" with transparent borders that fill and tilt on hover (`rotate(-1deg) translateY(-2px)`). Active link is solid accent-colored with a slight rotation
- **Theme toggle** — 38×38px brutalist-bordered button. Hover: rotates 20° and turns yellow
- **Donate button** — Small primary button
- **Hamburger** — Brutalist square button, hidden on desktop, shows on ≤900px
- **Mobile menu** — Full-width dropdown with arrow-slide hover animations on links

### Footer

**Files:** `src/components/Footer.jsx` + `Footer.css`

Multi-section footer with:

- **Mosaic divider** — 10-color animated bar at the top
- **Color strip** — Same zigzag pattern as the navbar
- **Ambient glow orb** — Radial gradient for depth (dark mode)
- **3×3 tile logo** — 9 tiles from the palette with staggered pulse animation (opacity + scale + rotation cycling)
- **4-column grid layout:**
  - Brand column: tile logo, name, tagline, social links (brutalist icon buttons with rotate hover)
  - Navigate column: all 7 page links with arrow-slide-in hover effect
  - Programs column: 6 program names
  - Get Involved column: 6 action links
- **Bottom bar:** 3px top border, copyright + "Made with ♥" tagline

### CursorTrail — Custom Cursor

**Files:** `src/components/CursorTrail.jsx` + `CursorTrail.css`

A **completely custom cursor system** that replaces the default cursor on pointer devices:

- **System cursor hidden** via `* { cursor: none !important }` (only on `pointer: fine` devices)

- **Custom cursor ring:**
  - 38px circle, 1.5px accent-colored border, subtle glow shadow
  - Follows mouse position via `transform: translate()`
  - **On-link state:** Morphs to a 48px **diamond** (square rotated 45°) with teal color and stronger glow
  - **Pressed state:** Shrinks to 20px with tangerine color and enlarged dot

- **Trailing mosaic tiles:**
  - 12 small `<div>` elements (14×14px) in different palette colors
  - Each follows the one ahead of it with progressive lag (`0.18 - i * 0.012`)
  - Scale decreases along the trail (`1 → 0.1`)
  - Each tile rotates by `i * 15` degrees
  - Creates a "mosaic ribbon" following the cursor

- **Click sparkle burst:**
  - 10 particles spawn on each click
  - Arranged in a circle, fly outward with CSS animation
  - Random accent colors with glow shadows
  - Self-remove after 600ms

### Marquee — Infinite Scrolling Ticker

**Files:** `src/components/Marquee.jsx` + `Marquee.css`

A horizontal scrolling ticker that continuously scrolls content:

- Content is doubled (array concatenated with itself) for seamless looping
- `translateX(0)` → `translateX(-50%)` animation at configurable speed
- Separator diamonds (`◆`) spin continuously
- Text uses gradient `background-clip: text` (Yellow → Cyan → Lime)
- Hover on items: `scaleY(1.15) skewX(-5deg)` with drop-shadow
- Supports `reverse` direction
- Respects `prefers-reduced-motion`

### MosaicCanvas — Interactive Tile Grid

**File:** `src/components/MosaicCanvas.jsx`

An **interactive 8×8 grid canvas** where users can paint tiles:

- 20-color palette with rounded-rect tiles and 2px gaps
- **Mouse proximity glow:** Tiles scale up (1 → 1.18) and emit `shadowBlur` glow based on cursor distance
- **Subtle pulse:** Each tile has an individual phase-offset sine wave brightness oscillation
- **Click interaction:** Clicking a tile randomizes its color, then triggers a **ripple effect** — neighboring tiles (Manhattan distance ≤ 2) also randomize with 60ms staggered delays
- Cursor appears as crosshair
- Wrapped in brutalist frame (`3px solid var(--c7)`, `--shadow-brutal-lg`) with handwritten hint text

### StopMotionMosaic — 3D Rotating Cube Art

**File:** `src/components/StopMotionMosaic.jsx`

A **3D mosaic sculpture** rendered on canvas at **8 FPS** for a stop-motion feel:

- 4×4×4 grid with ~55% of positions occupied (random culling creates organic gaps)
- Full 3D rotation math with Y-axis continuous rotation and X-axis tilt
- **Painter's algorithm** depth sorting
- Per-cube face rendering with backface culling (cross-product normal test)
- Face shading: front = base color, top = lighter, sides = darker (via `color-mix`)
- Per-frame random jitter added to persistent per-cube jitter
- Thick 2px stroke borders with "zine scribble" inner lines (random 20% chance per face)
- Drop-shadow filter for cutout aesthetic

### Scroll3DWrapper — Scroll-Linked 3D Tilt

**File:** `src/components/Scroll3DWrapper.jsx`

Uses **Framer Motion** `useScroll` + `useTransform` to create perspective-based 3D rotation as elements scroll through the viewport:

- Configurable `intensity` multiplier and `direction` ("up", "down", "left", "right")
- `perspective: 1000px` with `preserve-3d` transform
- `rotateX`/`rotateY` map from scroll position (top of viewport → center → bottom)
- `scale` breathes from 0.95 → 1.0 → 0.95
- `translateZ` depth (-50 → 0 → -50)
- Wraps cause cards, testimonial cards, program cards, work cards, timeline items

### CenterRevealWrapper — Clip-Path Scroll Reveal

**File:** `src/components/CenterRevealWrapper.jsx`

Uses **Framer Motion** `useScroll` + `useTransform` to animate a `clip-path: inset()` property:

- As the element scrolls from bottom to center of viewport:
  - `inset(0% 50% 0% 50%)` → `inset(0% 0% 0% 0%)`
- Creates a "curtain opening from center" reveal effect
- Used on the quote banner and CTA sections

---

## Pages

### Home

**File:** `src/pages/Home.jsx` + `Home.css`

The landing page is the densest, most animation-heavy page:

**Hero Section:**
- Full-viewport with `min-height: 100vh`
- 20 floating background tiles with randomized positions, sizes, colors, rotation, and float animations
- **Parallax mouse-tilt** on the entire hero: CSS custom properties `--rx`/`--ry` update on mousemove
- Tag sticker: "Founded & Managed by Teens"
- `<h1>` with mixed typography: "Every piece" (Outfit) + "*matters.*" (handwritten cursive, accent color) + "counts." (neon lime with underline bar)
- Handwritten annotation: "↙ we're just teens doing big things!"
- Two CTAs: "Our Story" (primary) and "Join Us ✦" (outline)
- Embedded interactive `<MosaicCanvas>` in a brutalist frame with glow pulse animation and "☝ tap any tile to repaint it!" hint

**Stats Bar:**
- Horizontal row of 4 stat cards with alternating rotations
- Numbers in accent colors (Outfit 800, 36px)
- Labels in cursive font

**Causes Section (What We Do):**
- 4-column grid of cause cards, each wrapped in `<Scroll3DWrapper>`
- Cards have **perspective tilt on mouse-move** (`perspective(600px) rotateX/Y`)
- Tape decorations on alternating cards
- Icons in tinted background squares with colored borders and matching shadow

**Quote Banner:**
- Full-width dark gradient background with 30-tile pulsing grid overlay
- Giant 140px quotation mark in near-invisible white
- Blockquote in cursive font, centered
- Wrapped in `<CenterRevealWrapper>` for scroll-triggered curtain reveal

**Testimonials:**
- 3-column grid, each in `<Scroll3DWrapper>`
- Cards with color top-bars, tape decorations, cursive quotes
- Avatar squares with initial letters and brutalist shadows

**CTA Section:**
- Dark gradient card with pulsing background tile grid
- "Ready to add your piece to the mosaic?" headline
- Two action buttons: neon lime primary, ghost outline
- Wrapped in `<CenterRevealWrapper>`

**Hero entrance animations:**
- `.hero-text` slaps in from left with rotation (`heroTextSlap`)
- `.hero-mosaic` slaps in from right with rotation and scale (`heroMosaicSlap`)

### About

**File:** `src/pages/About.jsx` + `About.css`

**Page Hero:**
- Floating tile decorations (12 tiles with fixed positions and float animation)
- Cursive subtitle: "someone had to."
- Pill row: "Est. 2023", "100% Teen-Led", "18 Cities", "2,400+ Lives"

**Origin Section:**
- 2-column split: text left, interactive `<MosaicCanvas>` right
- Canvas wrapped in `<CenterRevealWrapper>` with floating animation
- Brutalist frame with cursive annotation

**Timeline:**
- Vertical timeline with a **4-color repeating linear-gradient** line on the left (20px segments cycling through Hot Pink, Neon Lime, Violet, Yellow)
- 5 timeline items, each wrapped in `<Scroll3DWrapper>` alternating left/right directions
- Square dot markers with brutalist shadows and slight rotation
- Years in cursive accent font

**Values Section:**
- 4-column grid of value cards with `<Scroll3DWrapper>`
- Each card has perspective tilt on mouse-move
- Tinted icon squares with colored borders and shadows

**Team Section:**
- 3-column grid of team cards with `<Scroll3DWrapper>` alternating up/down
- Each card has perspective tilt on mouse-move
- Avatar: 80×80px square with 2×2 tinted grid background overlay and large initial letter
- Tape decorations on every 3rd card
- Role in cursive, age in accent cursive

### Our Work

**File:** `src/pages/Work.jsx` + `Work.css`

**Page Hero:**
- Skewed color strips in background (one per project, `-8deg` skew)

**Project Grid:**
- 3-column grid; first project spans 2 columns ("featured")
- Each card wrapped in `<Scroll3DWrapper>`
- Cards have **glare overlay** — a radial gradient that follows the cursor via CSS custom properties `--glare-x`/`--glare-y`
- Color bar at top, tag + year metadata, title, description, impact stats with trend icon

**CTA Section:**
- "Have a project idea?" callout with "Pitch a Project" button
- Wrapped in `<Scroll3DWrapper>` for 3D depth effect

### Programs

**File:** `src/pages/Programs.jsx` + `Programs.css`

**Page Hero:**
- Background mosaic grid (6 columns, one per program, with pulsing opacity)
- Pill row showing first word of each program name in its color

**Program Grid:**
- 3-column grid of 6 program cards
- Each wrapped in `<Scroll3DWrapper>` alternating left/right
- Cards have:
  - 4px colored side bar (left edge)
  - 2×2 tinted icon tile background with icon overlay
  - "Enrolling Now" (green) or "Closed" (gray) badge
  - Tagline in mono uppercase
  - Full description
  - Detail pills (e.g. "Weekly workshops", "Annual summit")
  - Full-width CTA button in program color with `color-mix` glow shadow

### Get Involved

**File:** `src/pages/Involved.jsx` + `Involved.css`

**Page Hero:**
- Floating random-position tiles with float animation

**Ways to Help:**
- 4-column grid of cards with top border in accent color
- Tinted icon squares
- Perspective tilt on mouse-move
- Each has action button linking to Contact page

**Donation Band:**
- Full-width section with 2-column layout (text + tier grid)
- 4 donation tiers (`₹199`, `₹499`, `₹999`, `Custom`)
- Each tier card has a **bottom progress bar** that expands to full width on hover
- Amount in accent color, label in mono, description in muted text

**FAQ Accordion:**
- `<details>` / `<summary>` elements styled as cards
- Custom chevron icon that rotates 180° when open
- No `<details>` marker (hidden via `-webkit-details-marker`)
- Open state turns summary text accent-colored

### Blog

**File:** `src/pages/Blog.jsx` + `Blog.css`

**Page Hero:**
- Color strip background (one flex-child per post, 7% opacity)

**Featured Article:**
- Full-width card with 2-column layout (text + 3×3 animated tile visual)
- Color bar at top, metadata row, title in responsive clamp sizing

**Blog Grid:**
- 3-column grid of article cards
- Each card has perspective tilt on mouse-move
- Color bar, tag + read time + author metadata
- "Read →" link with expanding gap on hover
- Footer with author info separated by top border

**Newsletter Section:**
- Full-width split layout with email input + subscribe button
- Responsive: stacks vertically on mobile

### Contact

**File:** `src/pages/Contact.jsx` + `Contact.css`

**Page Hero:**
- 20 floating tiles with animation

**2-Column Layout:**

**Left — Contact Form:**
- Managed by React state (`useState` for form fields + active field tracking)
- Label highlights accent-colored when focused (`.focused` class toggled via `onFocus`/`onBlur`)
- 2-column name/email row, full-width select, full-width textarea
- Custom `select` dropdown with SVG chevron
- On submit: shows success state with animated 3×3 mosaic tile grid, checkmark icon, and "Send another" button

**Right — Info Sidebar:**
- Contact details card (email, phone, location) with icon badges
- Response times card (table of category → time estimates, color-coded)
- Embedded `<MosaicCanvas>` (260px, interactive) with monospace caption

---

## Routing & Navigation

The site uses **no router library**. Navigation is entirely state-based:

```jsx
const PAGES = { home: Home, about: About, work: Work, ... };
const [page, setPage] = useState("home");
const PageComponent = PAGES[page] || Home;
```

The `navigate` function:
1. Sets `loading = true` (shows PageLoader)
2. Waits 900ms (simulated transition)
3. Swaps the page component
4. Increments `pageKey` to force remount (triggers page-enter animation)
5. Scrolls to top instantly

---

## Theme System

- **Persistence:** `localStorage` key `tmf-theme`
- **Default:** Follows `prefers-color-scheme: dark` system preference
- **Toggle:** Sun/Moon icon button in navbar (`lucide-react` icons)
- **Implementation:** `data-theme="dark"` attribute on `<html>`, all CSS variables remap via `[data-theme="dark"] { ... }`
- **Transition:** Background and text color transitions use `var(--transition)` for smooth theme switching

---

## Responsive Design

Three breakpoints handle all layouts:

| Breakpoint  | Changes                                                       |
| ----------- | ------------------------------------------------------------- |
| `≤ 1000px`  | Cause grid: 4 → 2 columns. Program grid: 3 → 2 columns.     |
| `≤ 900px`   | Nav links hidden, hamburger shown. Mobile menu enabled. Grid layouts go to 2 or 1 columns. Footer: 4 → 2 columns. |
| `≤ 560–600px` | All grids: 1 column. CTA padding reduced. Footer: 1 column. Form row stacks. Newsletter stacks. |

The hero section uses `grid-template-columns: 1fr 1fr` → `1fr` at 800px with the mosaic reordered to `order: -1` (appears above text on mobile).

---

## Performance Considerations

- **Canvas animations** (MosaicIntro, MosaicCanvas, StopMotionMosaic, CursorTrail) use `requestAnimationFrame` and clean up on unmount via `cancelAnimationFrame`
- **StopMotionMosaic** renders at **8 FPS** intentionally (aesthetic choice + performance benefit)
- **IntersectionObserver** hooks disconnect after first reveal to avoid continuous observation
- **Paper texture** uses `pointer-events: none` to avoid event interception
- **Font preconnects** in `index.html` for Google Fonts CDN
- **CursorTrail** uses `passive: true` on mousemove listener
- **`will-change: transform`** on cursor elements for GPU compositing
- **The site is fully client-side** — no SSR, no API calls, no data fetching

---

## SEO

- `<title>`: "The Mosaic Foundation"
- `<meta name="description">`: "The Mosaic Foundation — a youth-led nonprofit woven from diverse stories, built by teens, for the world."
- Inline SVG favicon: 4-color tile grid (red, teal, yellow, purple)
- Semantic HTML: `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<blockquote>`, `<details>`, `<summary>`, `<form>`
- `aria-label` attributes on icon-only buttons and canvas elements

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```



---


