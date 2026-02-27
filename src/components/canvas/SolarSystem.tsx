'use client';

import { Suspense } from 'react';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { EarthGlobe } from './EarthGlobe';
import { planetConfigs } from '@/lib/constants';

interface SolarSystemProps {
  progressRef: React.RefObject<number>;
}

export function SolarSystem({ progressRef }: SolarSystemProps) {
  return (
    <group>
      <Sun progressRef={progressRef} />
      {planetConfigs.map((config) =>
        config.name === 'earth' ? (
          <Suspense key={config.name} fallback={
            <Planet config={config} progressRef={progressRef} />
          }>
            <EarthGlobe config={config} progressRef={progressRef} />
          </Suspense>
        ) : (
          <Planet
            key={config.name}
            config={config}
            progressRef={progressRef}
          />
        )
      )}
    </group>
  );
}
