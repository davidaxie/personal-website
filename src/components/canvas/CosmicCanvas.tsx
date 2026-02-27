'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { CosmicScene } from './CosmicScene';

interface CosmicCanvasProps {
  onReady?: () => void;
}

function ReadyNotifier({ onReady }: { onReady?: () => void }) {
  const [notified, setNotified] = useState(false);
  useEffect(() => {
    if (!notified && onReady) {
      const t = setTimeout(() => {
        onReady();
        setNotified(true);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [notified, onReady]);
  return null;
}

export function CosmicCanvas({ onReady }: CosmicCanvasProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      camera={{ fov: 60, near: 0.1, far: 500, position: [0, 0, 30] }}
      style={{ background: '#000000' }}
    >
      <Suspense fallback={null}>
        <CosmicScene />
        <ReadyNotifier onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
