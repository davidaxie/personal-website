'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { siteContent } from '@/data/content';

export function Experience() {
  return (
    <section id="experience" className="min-h-screen flex items-center py-32">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <SectionHeader label="// Venus" title="Experience" gradient="venus" />

        <div className="relative">
          {/* Brighter 3px timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#E8CDA0] via-[#DAA520]/60 to-[#E8CDA0]/30 rounded-full" />

          <div className="space-y-8">
            {siteContent.work.map((entry, i) => (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-14"
              >
                {/* Timeline dot — double-ring with signal animation for current */}
                <div className="absolute left-[8px] top-8 flex items-center justify-center">
                  {i === 0 ? (
                    <>
                      <div className="absolute w-[28px] h-[28px] rounded-full border border-[#E8CDA0]/40 animate-ping" />
                      <div
                        className="w-[24px] h-[24px] rounded-full border-2 border-[#E8CDA0] bg-black flex items-center justify-center"
                        style={{ boxShadow: '0 0 16px rgba(232,205,160,0.4)' }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E8CDA0]" />
                      </div>
                    </>
                  ) : (
                    <div className="w-[16px] h-[16px] rounded-full border-2 border-white/40 bg-black flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    </div>
                  )}
                </div>

                <GlassCard glowColor={i === 0 ? 'venus' : 'venus'}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[11px] tracking-wider text-white/45">
                      {entry.period}
                    </span>
                    {i === 0 && (
                      <Badge variant="venus">LIVE</Badge>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-1">
                    {entry.role}
                  </h3>
                  <p className="text-sm text-gradient-venus font-semibold mb-3 inline-block">
                    {entry.company}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">
                    {entry.description}
                  </p>
                  {entry.highlight && (
                    <div className="inline-block px-3 py-1.5 mb-4 rounded-md bg-[#E8CDA0]/10 border border-[#E8CDA0]/20">
                      <p className="text-xs font-mono text-[#E8CDA0]">
                        {entry.highlight}
                      </p>
                    </div>
                  )}
                  {entry.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {entry.technologies.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
