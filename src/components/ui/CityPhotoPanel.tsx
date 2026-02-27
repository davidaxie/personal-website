'use client';

import { useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useFootprintsStore } from '@/stores/footprintsStore';
import { memories } from '@/data/memories';
import { cities } from '@/data/cities';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function CityPhotoPanel() {
  const activeCity = useFootprintsStore((s) => s.activeCity);
  const selectedPhoto = useFootprintsStore((s) => s.selectedPhoto);
  const setSelectedPhoto = useFootprintsStore((s) => s.setSelectedPhoto);
  const closeAll = useFootprintsStore((s) => s.closeAll);
  const { subscribe } = useScrollProgress();

  const cityData = useMemo(() => {
    if (!activeCity) return null;
    const city = cities.find((c) => c.id === activeCity);
    const photos = memories.filter((m) => m.city === activeCity);
    return city ? { city, photos } : null;
  }, [activeCity]);

  // Auto-close when scrolling away from Earth section
  useEffect(() => {
    if (!activeCity) return;
    return subscribe((progress) => {
      if (progress < 0.38 || progress > 0.66) {
        closeAll();
      }
    });
  }, [activeCity, subscribe, closeAll]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!cityData) return;

      if (e.key === 'Escape') {
        if (selectedPhoto !== null) {
          setSelectedPhoto(null);
        } else {
          closeAll();
        }
        return;
      }

      if (selectedPhoto === null) return;

      if (e.key === 'ArrowLeft' && selectedPhoto > 0) {
        setSelectedPhoto(selectedPhoto - 1);
      } else if (e.key === 'ArrowRight' && selectedPhoto < cityData.photos.length - 1) {
        setSelectedPhoto(selectedPhoto + 1);
      }
    },
    [cityData, selectedPhoto, setSelectedPhoto, closeAll],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!cityData) return null;

  return (
    <>
      {/* Photo Panel */}
      <AnimatePresence>
        {activeCity && (
          <motion.div
            key={activeCity}
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-[640px]"
          >
            <div className="card-premium rounded-2xl p-5 relative overflow-hidden">
              {/* Noise texture */}
              <div className="noise-overlay" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {cityData.city.name}
                    </h3>
                    <span className="font-mono text-[10px] text-white/35 tracking-wider uppercase">
                      {cityData.photos.length} {cityData.photos.length === 1 ? 'memory' : 'memories'}
                    </span>
                  </div>
                  <button
                    onClick={closeAll}
                    className="text-white/30 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Horizontal scrollable thumbnail strip */}
                <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                  {cityData.photos.map((photo, index) => (
                    <button
                      key={photo.src}
                      onClick={() => setSelectedPhoto(index)}
                      className="flex-shrink-0 rounded-lg overflow-hidden border border-white/8 hover:border-[#4B8BBE]/40 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#4B8BBE]/50"
                    >
                      <div className="relative w-[100px] h-[75px] sm:w-[120px] sm:h-[90px]">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedPhoto !== null && cityData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <Image
                src={cityData.photos[selectedPhoto].src}
                alt={cityData.photos[selectedPhoto].alt}
                width={1200}
                height={900}
                className="rounded-xl object-contain w-full h-auto max-h-[70vh]"
                priority
              />

              <div className="mt-3 text-center">
                <p className="text-white text-sm font-medium">
                  {cityData.photos[selectedPhoto].caption || cityData.photos[selectedPhoto].alt}
                </p>
                <p className="text-white/35 font-mono text-[10px] mt-1 uppercase tracking-wider">
                  {cityData.city.name} &middot; {selectedPhoto + 1} / {cityData.photos.length}
                </p>
              </div>

              {/* Left arrow */}
              {selectedPhoto > 0 && (
                <button
                  onClick={() => setSelectedPhoto(selectedPhoto - 1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-2 p-3 text-white/40 hover:text-white transition-colors"
                  aria-label="Previous photo"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}

              {/* Right arrow */}
              {selectedPhoto < cityData.photos.length - 1 && (
                <button
                  onClick={() => setSelectedPhoto(selectedPhoto + 1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-2 p-3 text-white/40 hover:text-white transition-colors"
                  aria-label="Next photo"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
