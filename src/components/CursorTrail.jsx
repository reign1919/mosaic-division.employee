import { useEffect, useRef } from 'react';
import './CursorTrail.css';

export default function CursorTrail() {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);
  const sparklesRef = useRef([]);
  const position = useRef({ x: 0, y: 0 });
  const onLink = useRef(false);
  const pressed = useRef(false);
  const animationFrame = useRef(null);

  useEffect(() => {
    const isPointer = window.matchMedia('(pointer: fine)').matches;
    if (!isPointer) return;

    // Initialize trail elements
    trailRef.current = [...Array(12)].map(() => ({
      x: 0,
      y: 0,
      element: null,
    }));

    const handleMouseMove = (e) => {
      position.current = { x: e.clientX, y: e.clientY };

      const target = e.target;
      onLink.current = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
    };

    const handleMouseDown = () => {
      pressed.current = true;
      createSparkles();
    };

    const handleMouseUp = () => {
      pressed.current = false;
    };

    const createSparkles = () => {
      const container = document.querySelector('.sparkles-container');
      if (!container) return;

      for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        const angle = (i / 10) * 360;
        const color = `var(--c${(i % 10) + 1})`;
        sparkle.style.setProperty('--angle', angle);
        sparkle.style.setProperty('--color', color);
        sparkle.style.left = `${position.current.x}px`;
        sparkle.style.top = `${position.current.y}px`;
        container.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 600);
      }
    };

    const animate = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.transform = `translate(${position.current.x - 19}px, ${position.current.y - 19}px)`;

        cursor.classList.remove('on-link', 'pressed');
        if (onLink.current) cursor.classList.add('on-link');
        if (pressed.current) cursor.classList.add('pressed');
      }

      // Animate trail with lag
      let leaderX = position.current.x;
      let leaderY = position.current.y;

      trailRef.current.forEach((segment, i) => {
        if (!segment.element) return;

        const lag = 0.18 - i * 0.012;
        segment.x += (leaderX - segment.x) * lag;
        segment.y += (leaderY - segment.y) * lag;

        const scale = 1 - i * 0.07;
        const rotation = i * 15;
        const opacity = 1 - i * 0.08;

        segment.element.style.transform = `translate(${segment.x - 7}px, ${segment.y - 7}px) rotate(${rotation}deg) scale(${scale})`;
        segment.element.style.opacity = opacity;

        leaderX = segment.x;
        leaderY = segment.y;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Start animation loop
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    const isPointer = window.matchMedia('(pointer: fine)').matches;
    if (!isPointer) return;

    // Attach elements to trail segments
    const trailElements = document.querySelectorAll('.trail-tile');
    trailRef.current.forEach((segment, i) => {
      if (trailElements[i]) {
        segment.element = trailElements[i];
        segment.x = position.current.x;
        segment.y = position.current.y;
      }
    });
  }, []);

  const isPointer = window.matchMedia('(pointer: fine)').matches;
  if (!isPointer) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor-ring" />
      <div className="cursor-trail">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="trail-tile"
            style={{ backgroundColor: `var(--c${(i % 10) + 1})` }}
          />
        ))}
      </div>
      <div className="sparkles-container" />
    </>
  );
}
