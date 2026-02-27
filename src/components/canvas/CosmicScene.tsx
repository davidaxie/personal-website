'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraController } from './CameraController';
import { ParticleField } from './ParticleField';
import { SolarSystem } from './SolarSystem';
import { Effects } from './Effects';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function CosmicScene() {
  const { progressRef } = useScrollProgress();
  const smoothProgress = useRef(0);

  useFrame((_, delta) => {
    const target = progressRef.current ?? 0;
    smoothProgress.current += (target - smoothProgress.current) * Math.min(1, delta * 4);
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 80, 300]} />
      <ambientLight intensity={0.015} color="#ffffff" />

      <CameraController progressRef={smoothProgress} />
      <ParticleField progressRef={smoothProgress} />
      <SolarSystem progressRef={smoothProgress} />
      <Effects progressRef={smoothProgress} />
    </>
  );
}
