'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionInView } from '@/hooks/useSectionInView';
import { sectionIds, sectionPlanet, planetColors } from '@/lib/constants';

const navLabels: Record<string, string> = {
  hero: 'Home',
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  footprints: 'Footprints',
  skills: 'Skills',
  interests: 'Interests',
  achievements: 'Achievements',
  contact: 'Contact',
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function Navbar() {
  const activeSection = useSectionInView();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      setVisible(scrollFraction > 0.05);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get the active section's planet color
  const activePlanetKey = activeSection ? sectionPlanet[activeSection] : 'sun';
  const activePlanetColor = activePlanetKey ? planetColors[activePlanetKey] : '#D0D0D8';

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Main navigation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-3 py-2.5 flex items-center gap-1.5"
          style={{
            borderRadius: 9999,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={navLabels[id]}
              className={`relative px-3 py-2 text-xs font-mono tracking-wider rounded-full transition-colors ${
                activeSection === id
                  ? 'text-white'
                  : 'text-white/45 hover:text-white'
              }`}
            >
              {activeSection === id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: hexToRgba(activePlanetColor, 0.2),
                    border: `1px solid ${hexToRgba(activePlanetColor, 0.4)}`,
                    boxShadow: `0 0 12px ${hexToRgba(activePlanetColor, 0.2)}`,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 hidden md:inline">{navLabels[id]}</span>
              <span className="relative z-10 md:hidden w-2 h-2 rounded-full bg-current block" aria-hidden="true" />
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
