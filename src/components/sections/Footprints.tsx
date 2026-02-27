'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cities } from '@/data/cities';
import { useFootprintsStore } from '@/stores/footprintsStore';

export function Footprints() {
  const { activeCity, setActiveCity } = useFootprintsStore();

  return (
    <section id="footprints" className="min-h-[60vh] flex items-center py-32">
      <div className="max-w-4xl mx-auto px-6 w-full text-center">
        <SectionHeader
          label="// Earth"
          title="Footprints"
          gradient="earth"
          align="center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/45 font-mono text-sm max-w-md mx-auto leading-relaxed mb-8"
        >
          Select a city to explore memories from around the world.
        </motion.p>

        {/* Clickable city chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setActiveCity(activeCity === city.id ? null : city.id)}
              className={`
                px-4 py-2 rounded-full font-mono text-xs tracking-[0.15em] uppercase
                border transition-all duration-300 cursor-pointer
                ${activeCity === city.id
                  ? 'border-planet-earth bg-planet-earth/20 text-white'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:text-white/70'
                }
              `}
            >
              {city.name}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
