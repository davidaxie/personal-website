'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
      }
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {/* Outer white glow */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Inner gold glow */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-[200px] h-[200px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(253,184,19,0.06) 0%, transparent 70%)',
        }}
      />
    </>
  );
}
