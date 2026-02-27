'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[200vh] flex items-start justify-center pt-[18vh] md:pt-[22vh]"
    >
      <motion.div style={{ opacity, y }} className="px-6 md:px-12 lg:px-20 max-w-7xl w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12 lg:gap-20">
          {/* Left — Text content */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            {/* Location label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-6 justify-center md:justify-start"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-planet-sun animate-pulse-live" />
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/50">
                Georgetown // Washington, D.C.
              </span>
            </motion.div>

            {/* Name — split lines */}
            <div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display font-bold text-gradient-sun leading-[0.9] tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
                >
                  DAVID
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display font-bold text-white leading-[0.9] tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
                >
                  XIE
                </motion.h1>
              </div>
            </div>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-white/45 mt-5"
            >
              Builder &middot; Trader &middot; Creator
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-white/55 text-base md:text-lg leading-relaxed mt-6 max-w-lg mx-auto md:mx-0"
            >
              Incoming Citadel Associates. Building algo trading systems at Clockwork and co-founding{' '}
              <span className="text-white/75">Ambees.io</span>.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-12 flex items-center gap-3 justify-center md:justify-start"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full border border-white/25 flex justify-center pt-1.5"
                style={{ boxShadow: '0 0 12px rgba(208,208,216,0.15)' }}
              >
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 h-2.5 rounded-full bg-gradient-to-b from-[#D0D0D8] to-white"
                />
              </motion.div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
                Scroll to explore
              </span>
            </motion.div>
          </div>

          {/* Right — Portrait photo with edge fade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex-shrink-0 order-1 md:order-2"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-[28rem] lg:w-[22rem] lg:h-[32rem] overflow-hidden rounded-2xl">
              <Image
                src="/david-hero.jpg"
                alt="David Xie"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Edge fades — blend photo into dark background */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" style={{ height: '30%' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" style={{ width: '20%' }} />
              <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent" style={{ width: '20%', left: 'auto', right: 0 }} />
            </div>
            {/* Soft ambient glow */}
            <div className="absolute inset-0 -z-10 rounded-2xl blur-3xl bg-white/[0.03] scale-125" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
