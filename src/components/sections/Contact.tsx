'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlowButton } from '@/components/ui/GlowButton';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { siteContent } from '@/data/content';

export function Contact() {
  const { contact } = siteContent;

  return (
    <section id="contact" className="min-h-screen flex items-center py-32">
      <div className="max-w-3xl mx-auto px-6 w-full text-center">
        <SectionHeader label="// Neptune" title="Open Channel" align="center" gradient="neptune" />

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="relative w-32 h-40 md:w-40 md:h-52 rounded-2xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/david-linkedin.jpg"
              alt="David Xie"
              fill
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 mb-12 max-w-lg mx-auto text-lg"
        >
          Builder. Trader. Creator. Let&apos;s connect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {contact.email && (
            <GlowButton
              href={`mailto:${contact.email}`}
              variant="primary"
              size="lg"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            >
              Get in Touch
            </GlowButton>
          )}
          {contact.github && (
            <GlowButton href={contact.github} variant="secondary" size="md">
              GitHub
            </GlowButton>
          )}
          {contact.linkedin && (
            <GlowButton href={contact.linkedin} variant="secondary" size="md">
              LinkedIn
            </GlowButton>
          )}
          {contact.twitter && (
            <GlowButton href={contact.twitter} variant="secondary" size="md">
              Twitter
            </GlowButton>
          )}
          {contact.instagram && (
            <GlowButton href={contact.instagram} variant="secondary" size="md">
              Instagram
            </GlowButton>
          )}
          {contact.website && (
            <GlowButton href={contact.website} variant="secondary" size="md">
              Ambees.io
            </GlowButton>
          )}
        </motion.div>

        {/* Divider before closing tagline */}
        <div className="my-16">
          <SectionDivider />
        </div>

        {/* Galaxy reveal tagline — full opacity gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <p
            className="font-display font-bold text-gradient-neptune"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
          >
            Builder. Trader. Creator.
          </p>
        </motion.div>

        <div className="mt-16 text-white/25 font-mono text-[10px] tracking-[0.3em] uppercase">
          &copy; {new Date().getFullYear()} David Xie
        </div>
      </div>
    </section>
  );
}
