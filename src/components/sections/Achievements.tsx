'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteContent } from '@/data/content';

const glowColors: Array<'saturn'> = ['saturn', 'saturn', 'saturn', 'saturn', 'saturn', 'saturn'];

export function Achievements() {
  return (
    <section id="achievements" className="min-h-screen flex items-center py-32">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <SectionHeader label="// Saturn" title="Achievements" gradient="saturn" />

        {/* 2-column grid instead of timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteContent.achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard glowColor={glowColors[i]} className="h-full relative overflow-hidden">
                {/* Ghost watermark year */}
                <div className="absolute -top-4 -right-4 font-display font-bold text-white/[0.02] pointer-events-none select-none leading-none" style={{ fontSize: '120px' }}>
                  {achievement.year}
                </div>

                {/* Year as hero element */}
                <div className="font-display text-3xl font-bold text-gradient-saturn mb-3">
                  {achievement.year}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {achievement.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
