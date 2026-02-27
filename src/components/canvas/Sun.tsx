'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { noiseGLSL } from '@/lib/shaders/noise.glsl';

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;

  ${noiseGLSL}

  void main() {
    vec3 p = vPosition * 1.5;
    vec3 slowFlow = vec3(uTime * 0.08, uTime * 0.05, uTime * 0.06);
    vec3 fastFlow = vec3(uTime * 0.15, uTime * 0.1, uTime * 0.12);

    float n1 = fbm(p + slowFlow, 5) * 0.5 + 0.5;
    float n2 = fbm(p * 2.5 + fastFlow + 50.0, 4) * 0.5 + 0.5;
    float granulation = snoise(vPosition * 10.0 + vec3(uTime * 0.04)) * 0.5 + 0.5;

    // Solar palette — cool silver/white
    vec3 whiteHot = vec3(1.0, 1.0, 1.0);
    vec3 silverCore = vec3(0.82, 0.82, 0.85);   // #D0D0D8
    vec3 coolGray = vec3(0.55, 0.55, 0.65);
    vec3 brightWhite = vec3(0.95, 0.95, 1.0);

    vec3 col = mix(silverCore, whiteHot, n1 * 0.5);
    col = mix(col, coolGray, pow(n2, 2.5) * 0.35);
    col = mix(col, brightWhite, pow(n1 * n2, 3.0) * 0.15);
    col = mix(col, col * 0.8, (1.0 - granulation) * 0.2);

    float NdotV = max(dot(normalize(vNormal), normalize(vViewDir)), 0.0);
    float limbDarkening = pow(NdotV, 0.45);
    vec3 limbColor = mix(coolGray * 0.7, col, pow(NdotV, 0.6));
    col = mix(limbColor, col, pow(NdotV, 0.35));
    col *= limbDarkening;
    col *= 1.8;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const coronaVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vLocalPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coronaFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uFresnelPower;
  uniform float uTime;
  uniform float uNoiseStrength;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  ${noiseGLSL}

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = 1.0 - dot(viewDir, vNormal);
    fresnel = pow(fresnel, uFresnelPower);

    vec3 noiseCoord = normalize(vLocalPosition) * 2.0;
    float streamer = fbm(noiseCoord + vec3(uTime * 0.12, uTime * 0.08, uTime * -0.1), 4) * 0.5 + 0.5;
    float detail = snoise(noiseCoord * 4.0 + vec3(uTime * 0.2)) * 0.5 + 0.5;
    float corona = fresnel * (1.0 + streamer * uNoiseStrength + detail * uNoiseStrength * 0.3);

    vec3 innerColor = vec3(1.0, 0.95, 0.8);
    vec3 col = mix(innerColor, uColor, fresnel * 0.6);
    float intensity = corona * uOpacity;
    gl_FragColor = vec4(col * 1.2, intensity);
  }
`;

interface SunProps {
  progressRef: React.RefObject<number>;
}

export function Sun({ progressRef }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
  }), []);

  const innerCoronaUniforms = useMemo(() => ({
    uColor: { value: new THREE.Color('#D0D0D8') },
    uOpacity: { value: 0.2 },
    uFresnelPower: { value: 2.5 },
    uTime: { value: 0 },
    uNoiseStrength: { value: 0.5 },
  }), []);

  const outerCoronaUniforms = useMemo(() => ({
    uColor: { value: new THREE.Color('#D0D0D8') },
    uOpacity: { value: 0.08 },
    uFresnelPower: { value: 1.2 },
    uTime: { value: 0 },
    uNoiseStrength: { value: 0.9 },
  }), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const progress = progressRef.current ?? 0;

    uniforms.uTime.value = timeRef.current;
    uniforms.uProgress.value = progress;
    innerCoronaUniforms.uTime.value = timeRef.current;
    outerCoronaUniforms.uTime.value = timeRef.current;

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }

    // Scale: emerge from void, grow during hero, shrink after to avoid blinding text
    if (groupRef.current) {
      let scale = 0;
      if (progress < 0.08) {
        scale = progress / 0.08 * 0.1;
      } else if (progress < 0.20) {
        const t = (progress - 0.08) / 0.12;
        scale = 0.1 + t * 1.9;
      } else if (progress < 0.35) {
        // Shrink as camera moves away from Sun
        const t = (progress - 0.20) / 0.15;
        scale = 2.0 - t * 1.2; // 2.0 → 0.8
      } else {
        scale = 0.8;
      }
      groupRef.current.scale.setScalar(Math.max(0.01, scale));
    }

    // Dim point light after hero to reduce glare on other sections
    if (lightRef.current) {
      const lightIntensity = progress < 0.20 ? 5 : progress < 0.35
        ? 5 - ((progress - 0.20) / 0.15) * 3 // 5 → 2
        : 2;
      lightRef.current.intensity = lightIntensity;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={5} color="#D0D0D8" distance={120} decay={2} />

      {/* Solar surface */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          toneMapped={false}
        />
      </mesh>

      {/* Inner corona */}
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <shaderMaterial
          vertexShader={coronaVertexShader}
          fragmentShader={coronaFragmentShader}
          uniforms={innerCoronaUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Outer corona */}
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <shaderMaterial
          vertexShader={coronaVertexShader}
          fragmentShader={coronaFragmentShader}
          uniforms={outerCoronaUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
