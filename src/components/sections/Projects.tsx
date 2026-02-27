'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { GlowButton } from '@/components/ui/GlowButton';
import { siteContent } from '@/data/content';

const projectGlowColors: Array<'earth'> = ['earth', 'earth', 'earth', 'earth'];

export function Projects() {
  const [featured, ...rest] = siteContent.projects;

  return (
    <section id="projects" className="min-h-screen flex items-center py-32">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <SectionHeader label="// Earth" title="Projects" gradient="earth" />

        {/* Featured project — full width hero card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard glowColor="earth" className="p-8 md:p-10">
            <div className="md:flex md:gap-10 md:items-start">
              <div className="md:flex-1">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#4B8BBE] mb-3">
                  Featured Project
                </div>
                <h3
                  className="font-display font-bold text-gradient-earth leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                >
                  {featured.name}
                </h3>
                <p className="text-white/70 leading-relaxed mb-3">
                  {featured.description}
                </p>
                {featured.story && (
                  <p className="text-sm text-white/45 leading-relaxed mb-4">
                    {featured.story}
                  </p>
                )}
              </div>
              <div className="md:w-72 md:flex-shrink-0 md:text-right">
                {featured.impact && (
                  <div className="mb-4">
                    <div className="font-display font-bold text-gradient-earth leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                      {featured.impact.split(',')[0]}
                    </div>
                    {featured.impact.includes(',') && (
                      <div className="text-sm text-[#4B8BBE] font-mono mt-1">
                        {featured.impact.split(',').slice(1).join(',').trim()}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {featured.technologies.map((tech) => (
                    <Badge key={tech} variant="earth">{tech}</Badge>
                  ))}
                </div>
                {featured.url && (
                  <div className="mt-4">
                    <GlowButton href={featured.url} variant="primary" size="md">
                      View Project &rarr;
                    </GlowButton>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Remaining projects in 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            >
              <GlassCard glowColor={projectGlowColors[i + 1] || 'earth'} className="h-full flex flex-col">
                {project.image && (
                  <div className="relative w-full h-40 -mt-1 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-3 flex-1">
                  {project.description}
                </p>
                {project.impact && (
                  <div className="mb-3">
                    <span className="font-display text-lg font-bold text-gradient-earth">
                      {project.impact}
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                {project.url && (
                  <div className="mt-4">
                    <GlowButton href={project.url} variant="ghost" size="sm">
                      View Project &rarr;
                    </GlowButton>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
