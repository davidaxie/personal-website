'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ScrollProgressProvider } from '@/hooks/useScrollProgress';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Interests } from '@/components/sections/Interests';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';
import { Footprints } from '@/components/sections/Footprints';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { CityPhotoPanel } from '@/components/ui/CityPhotoPanel';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { SectionDivider } from '@/components/ui/SectionDivider';

const CosmicCanvas = dynamic(
  () => import('@/components/canvas/CosmicCanvas').then((m) => m.CosmicCanvas),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ScrollProgressProvider>
      <LoadingScreen isLoading={isLoading} />
      <CursorGlow />

      {/* Fixed Three.js canvas */}
      <div className="fixed inset-0 z-0">
        <CosmicCanvas onReady={() => setIsLoading(false)} />
      </div>

      {/* Globe-integrated city photo panel */}
      <CityPhotoPanel />

      {/* Scrollable HTML content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Footprints />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Interests />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <Contact />
      </div>
    </ScrollProgressProvider>
  );
}
