'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteContent } from '@/data/content';

const statGradients = [
  'text-gradient-sun',
  'text-gradient-sun',
  'text-gradient-sun',
  'text-gradient-sun',
  'text-gradient-sun',
  'text-gradient-sun',
];

const glowColors: Array<'jupiter'> = ['jupiter', 'jupiter', 'jupiter', 'jupiter', 'jupiter', 'jupiter'];

export function Interests() {
  return (
    <section id="interests" className="min-h-screen flex items-center py-32">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <SectionHeader label="// Jupiter" title="Interests" gradient="jupiter" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.interests.map((interest, i) => (
            <motion.div
              key={interest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <GlassCard glowColor={glowColors[i]} className="h-full">
                {/* Oversized gradient stat number */}
                {interest.headline && (
                  <div
                    className={`font-display font-bold leading-none mb-2 ${statGradients[i]}`}
                    style={{ fontSize: i === 0 ? 'clamp(2.5rem, 5vw, 4rem)' : 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    {interest.headline}
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {interest.name}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {interest.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
