'use client';

import { Html } from '@react-three/drei';
import { useFootprintsStore } from '@/stores/footprintsStore';
import type { CityMarker } from '@/data/cities';

interface CityLabelProps {
  city: CityMarker;
  position: [number, number, number];
}

export function CityLabel({ city, position }: CityLabelProps) {
  const setActiveCity = useFootprintsStore((s) => s.setActiveCity);
  const activeCity = useFootprintsStore((s) => s.activeCity);
  const isActive = activeCity === city.id;

  const handleClick = () => {
    // Toggle: if already active, close; otherwise open
    setActiveCity(activeCity === city.id ? null : city.id);
  };

  return (
    <group position={position}>
      {/* Glowing dot */}
      <mesh>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshBasicMaterial color={isActive ? '#4B8BBE' : '#ffffff'} />
      </mesh>
      <pointLight
        intensity={isActive ? 0.5 : 0.15}
        color={isActive ? '#4B8BBE' : '#ffffff'}
        distance={0.15}
        decay={2}
      />

      {/* HTML label */}
      <Html
        position={[0, 0.025, 0]}
        center
        occlude
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <button
          onClick={handleClick}
          className="group flex flex-col items-center"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span
            className="font-mono text-[9px] tracking-wider uppercase transition-all"
            style={{
              color: isActive ? '#4B8BBE' : 'rgba(255,255,255,0.7)',
              textShadow: '0 0 4px rgba(0,0,0,0.9)',
            }}
          >
            {city.name}
          </span>
        </button>
      </Html>
    </group>
  );
}
