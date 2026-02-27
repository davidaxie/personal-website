'use client';

import { motion } from 'framer-motion';

type PlanetGradient = 'sun' | 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune';

interface SectionHeaderProps {
  label: string;
  title: string;
  gradient?: PlanetGradient;
  align?: 'left' | 'center';
}

const gradientClasses: Record<PlanetGradient, string> = {
  sun: 'text-gradient-sun',
  mercury: 'text-white',
  venus: 'text-gradient-venus',
  earth: 'text-gradient-earth',
  mars: 'text-gradient-mars',
  jupiter: 'text-gradient-sun',
  saturn: 'text-gradient-saturn',
  uranus: 'text-gradient-uranus',
  neptune: 'text-gradient-neptune',
};

const labelColors: Record<PlanetGradient, string> = {
  sun: '#D0D0D8',
  mercury: '#8C8C8C',
  venus: '#E8CDA0',
  earth: '#4B8BBE',
  mars: '#C1440E',
  jupiter: '#C88B3A',
  saturn: '#DAA520',
  uranus: '#73D8E8',
  neptune: '#3454D1',
};

const underlineColors: Record<PlanetGradient, string> = {
  sun: 'from-[#D0D0D8] to-[#A0A0B0]',
  mercury: 'from-[#8C8C8C] to-transparent',
  venus: 'from-[#E8CDA0] to-[#DAA520]',
  earth: 'from-[#4B8BBE] to-[#73D8E8]',
  mars: 'from-[#C1440E] to-[#C88B3A]',
  jupiter: 'from-[#C88B3A] to-[#DAA520]',
  saturn: 'from-[#DAA520] to-[#FDB813]',
  uranus: 'from-[#73D8E8] to-[#4B8BBE]',
  neptune: 'from-[#3454D1] to-[#5070E0]',
};

export function SectionHeader({ label, title, gradient = 'sun', align = 'left' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      {/* Mono label with decorative line */}
      <div className={`flex items-center gap-4 mb-5 ${align === 'center' ? 'justify-center' : ''}`}>
        <div
          className="h-px w-8"
          style={{ background: `linear-gradient(to right, ${labelColors[gradient]}, transparent)` }}
        />
        <span
          className="font-mono text-[11px] tracking-[0.3em] uppercase font-medium"
          style={{ color: labelColors[gradient] }}
        >
          {label}
        </span>
      </div>

      {/* Gradient heading */}
      <h2
        className={`font-display font-bold ${gradientClasses[gradient]} leading-[1.05] tracking-tight`}
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
      >
        {title}
      </h2>

      {/* Animated underline accent */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className={`h-[2px] mt-6 rounded-full bg-gradient-to-r ${underlineColors[gradient]} ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </motion.div>
  );
}
