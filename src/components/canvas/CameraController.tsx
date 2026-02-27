'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getCameraState } from '@/lib/cameraPath';

interface CameraControllerProps {
  progressRef: React.RefObject<number>;
}

const _lerpLook = new THREE.Vector3();

export function CameraController({ progressRef }: CameraControllerProps) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 30));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const progress = progressRef.current ?? 0;
    const { position, lookAt } = getCameraState(progress);

    // Smooth interpolation for cinematic feel
    const speed = Math.min(1, delta * 3);
    currentPos.current.lerp(position, speed);
    currentLook.current.lerp(lookAt, speed);

    camera.position.copy(currentPos.current);

    // Subtle breathing — gentle sinusoidal drift
    const time = performance.now() * 0.001;
    camera.position.x += Math.sin(time * 0.3) * 0.05;
    camera.position.y += Math.cos(time * 0.2) * 0.03;

    _lerpLook.copy(currentLook.current);
    camera.lookAt(_lerpLook);
  });

  return null;
}
