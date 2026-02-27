'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { sectionRanges } from '@/lib/constants';

interface EffectsProps {
  progressRef: React.RefObject<number>;
}

const sectionMids = Object.values(sectionRanges).map(([start, end]) => ({
  mid: (start + end) / 2,
  halfWidth: (end - start) / 2,
}));

export function Effects({ progressRef }: EffectsProps) {
  const [bloomIntensity, setBloomIntensity] = useState(1.0);
  const currentRef = useRef(1.0);

  useFrame((_, delta) => {
    const progress = progressRef.current ?? 0;

    // Compute how close we are to any section center (0 = far, 1 = at center)
    let maxProximity = 0;
    for (const { mid, halfWidth } of sectionMids) {
      const dist = Math.abs(progress - mid);
      const proximity = 1 - Math.min(dist / halfWidth, 1);
      maxProximity = Math.max(maxProximity, proximity);
    }

    // Dim bloom when close to a planet, restore when transitioning
    const target = THREE.MathUtils.lerp(1.0, 0.3, maxProximity);
    currentRef.current = THREE.MathUtils.lerp(
      currentRef.current,
      target,
      Math.min(1, delta * 3),
    );

    // Only trigger React re-render when the change is perceptible
    if (Math.abs(currentRef.current - bloomIntensity) > 0.02) {
      setBloomIntensity(currentRef.current);
    }
  });

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
    </EffectComposer>
  );
}
