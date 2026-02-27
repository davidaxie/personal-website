'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteContent } from '@/data/content';

const categoryConfig: Record<string, {
  accent: string;
  glowColor: 'mars';
  borderColor: string;
  watermark: string;
  gradientSep: string;
}> = {
  Code: {
    accent: 'text-[#C1440E]',
    glowColor: 'mars',
    borderColor: 'border-[#C1440E]/30',
    watermark: '</>',
    gradientSep: 'from-[#C1440E]/20 to-transparent',
  },
  Finance: {
    accent: 'text-[#C88B3A]',
    glowColor: 'mars',
    borderColor: 'border-[#C88B3A]/30',
    watermark: '$',
    gradientSep: 'from-[#C88B3A]/20 to-transparent',
  },
  Creative: {
    accent: 'text-[#DAA520]',
    glowColor: 'mars',
    borderColor: 'border-[#DAA520]/30',
    watermark: '~',
    gradientSep: 'from-[#DAA520]/20 to-transparent',
  },
};

export function Skills() {
  return (
    <section id="skills" className="min-h-screen flex items-center py-32">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <SectionHeader label="// Mars" title="Skills" gradient="mars" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteContent.skills.map((category, i) => {
            const config = categoryConfig[category.category] || categoryConfig.Code;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <GlassCard glowColor={config.glowColor} className="h-full relative overflow-hidden">
                  {/* Watermark decorative character */}
                  <div className="absolute -top-2 -right-2 text-6xl font-display font-bold text-white/[0.03] pointer-events-none select-none leading-none">
                    {config.watermark}
                  </div>

                  {/* Category label with colored left border */}
                  <div className={`flex items-center gap-3 mb-6 border-l-2 ${config.borderColor} pl-3`}>
                    <span className={`font-mono text-xs tracking-[0.3em] uppercase font-medium ${config.accent}`}>
                      {category.category}
                    </span>
                  </div>

                  <div className="space-y-0">
                    {category.skills.map((skill, j) => (
                      <div key={skill.name}>
                        <div className="py-3">
                          <div className="font-mono text-sm text-white font-medium mb-1">
                            {skill.name}
                          </div>
                          <div className="text-xs text-white/70 leading-relaxed">
                            {skill.description}
                          </div>
                        </div>
                        {/* Gradient separator instead of flat border */}
                        {j < category.skills.length - 1 && (
                          <div className={`h-px bg-gradient-to-r ${config.gradientSep}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
