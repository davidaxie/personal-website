'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteContent } from '@/data/content';

const transmissionFields = [
  { label: 'Name', value: siteContent.identity.name },
  { label: 'Classification', value: 'Georgetown Undergrad' },
  { label: 'Location', value: 'Washington, D.C.' },
  ...siteContent.currently,
];

export function About() {
  // Split bio into first sentence (pull-quote) and rest
  const bio = siteContent.identity.bio;
  const firstDot = bio.indexOf('. ');
  const pullQuote = firstDot > 0 ? bio.slice(0, firstDot + 1) : bio;
  const restBio = firstDot > 0 ? bio.slice(firstDot + 2) : '';

  return (
    <section id="about" className="min-h-screen flex items-center py-32">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <SectionHeader label="// Mercury" title="About" gradient="mercury" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Transmission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard glowColor="mercury" className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#8C8C8C] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8C8C8C] font-medium">
                  Transmission Card
                </span>
              </div>
              <div className="space-y-4">
                {transmissionFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex justify-between items-baseline border-l-2 border-dotted border-[#8C8C8C]/20 pl-4 py-1"
                  >
                    <span className="font-mono text-xs text-white/45 tracking-wider uppercase">
                      {field.label}
                    </span>
                    <span className="text-sm text-white font-medium">{field.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard glowColor="mercury" className="h-full">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8C8C8C] mb-6 font-medium">
                Signal Decoded
              </div>
              {/* Pull-quote: first sentence larger + bolder */}
              <p className="text-white text-lg font-display font-bold leading-snug mb-4">
                &ldquo;{pullQuote}&rdquo;
              </p>
              {restBio && (
                <p className="text-white/70 leading-relaxed text-[15px]">
                  {restBio}
                </p>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
