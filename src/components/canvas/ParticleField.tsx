'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAR_COUNT = 5000;

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute vec3 aColor;
  attribute float aPhase;
  varying float vBrightness;
  varying vec3 vColor;
  varying float vPhase;
  uniform float uTime;
  uniform float uProgress;

  void main() {
    vBrightness = aBrightness;
    vColor = aColor;
    vPhase = aPhase;
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mvPosition.z;
    gl_PointSize = aSize * (200.0 / dist);
    gl_PointSize = clamp(gl_PointSize, 0.5, 5.0);
    // Stars emerge from void
    float appear = smoothstep(0.0, 0.15, uProgress);
    gl_PointSize *= appear;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vBrightness;
  varying vec3 vColor;
  varying float vPhase;
  uniform float uTime;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.0, 0.25, d);
    float twinkle = sin(uTime * 0.3 + vPhase) * 0.1 + 0.9;
    float brightness = vBrightness * twinkle;
    vec3 col = vColor * brightness * 1.3;
    gl_FragColor = vec4(col, alpha * brightness);
  }
`;

interface ParticleFieldProps {
  progressRef: React.RefObject<number>;
}

export function ParticleField({ progressRef }: ParticleFieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const brightnesses = new Float32Array(STAR_COUNT);
    const colors = new Float32Array(STAR_COUNT * 3);
    const phases = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 80 + Math.random() * 200;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      const rawSize = Math.random();
      sizes[i] = 0.5 + Math.pow(rawSize, 2.5) * 2.5;
      brightnesses[i] = 0.3 + Math.random() * 0.7;

      // Warm white star colors — slight random variation
      const warmth = 0.9 + Math.random() * 0.1;
      colors[i * 3] = warmth;                        // R
      colors[i * 3 + 1] = warmth * (0.96 + Math.random() * 0.04); // G
      colors[i * 3 + 2] = warmth * (0.90 + Math.random() * 0.10); // B

      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aBrightness', new THREE.BufferAttribute(brightnesses, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    const u = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
    };
    return { geometry: geo, uniforms: u };
  }, []);

  // Dispose geometry on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;
    uniforms.uProgress.value = progressRef.current ?? 0;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
