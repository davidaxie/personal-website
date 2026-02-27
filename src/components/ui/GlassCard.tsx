'use client';

import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: 'sun' | 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune';
}

const glowColors = {
  sun: 'rgba(208, 208, 216, 0.10)',
  mercury: 'rgba(140, 140, 140, 0.08)',
  venus: 'rgba(232, 205, 160, 0.10)',
  earth: 'rgba(75, 139, 190, 0.10)',
  mars: 'rgba(193, 68, 14, 0.10)',
  jupiter: 'rgba(200, 139, 58, 0.10)',
  saturn: 'rgba(218, 165, 32, 0.10)',
  uranus: 'rgba(115, 216, 232, 0.10)',
  neptune: 'rgba(52, 84, 209, 0.10)',
};

const DEFAULT_BG = 'rgba(255, 255, 255, 0.04)';

export function GlassCard({
  children,
  className = '',
  hover = true,
  glowColor = 'sun',
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !isHoveredRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.background =
      `radial-gradient(600px circle at ${x}px ${y}px, ${glowColors[glowColor]}, transparent 40%), ${DEFAULT_BG}`;
  }, [glowColor]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (cardRef.current) {
      cardRef.current.style.background = DEFAULT_BG;
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`card-premium noise-overlay p-6 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={hover ? {
        y: -6,
        transition: { duration: 0.3, ease: 'easeOut' },
      } : undefined}
      style={{
        background: DEFAULT_BG,
      }}
    >
      {/* Noise texture layer */}
      <div className="noise-layer" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
