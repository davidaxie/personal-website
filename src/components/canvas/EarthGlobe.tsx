'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { CityLabel } from './CityLabel';
import { cities } from '@/data/cities';
import { useFootprintsStore } from '@/stores/footprintsStore';
import { latLngToVector3 } from '@/lib/geoUtils';
import type { PlanetConfig } from '@/lib/constants';

// Atmosphere shader — sun-aware Rayleigh-like scattering
const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uAtmosphereColor;
  uniform vec3 uSunPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 sunDir = normalize(uSunPosition - vWorldPosition);

    float fresnel = 1.0 - dot(viewDir, vNormal);
    fresnel = pow(fresnel, 2.5);

    float NdotL = dot(vNormal, sunDir);
    float dayMask = smoothstep(-0.3, 0.2, NdotL);

    vec3 terminatorColor = mix(uAtmosphereColor, vec3(0.75, 0.40, 0.20), 0.25);
    float sunAngle = max(NdotL, 0.0);
    vec3 atmColor = mix(terminatorColor, uAtmosphereColor, sunAngle);

    float alpha = fresnel * 0.45 * dayMask;
    gl_FragColor = vec4(atmColor, alpha);
  }
`;

// Cloud layer vertex shader
const cloudVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Cloud layer fragment shader — animated procedural clouds
const cloudFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uSunPosition;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  // Simple hash-based noise for cloud animation
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise2d(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm2d(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise2d(p);
      p *= 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x += uTime * 0.003; // slow drift

    float clouds = fbm2d(uv * 8.0);
    float cloudMask = smoothstep(0.38, 0.65, clouds);

    // Sun lighting
    vec3 sunDir = normalize(uSunPosition - vWorldPosition);
    float NdotL = dot(vWorldNormal, sunDir);
    float dayMask = smoothstep(-0.08, 0.2, NdotL);

    vec3 cloudColor = vec3(0.95, 0.96, 0.98) * dayMask;
    float alpha = cloudMask * 0.42 * dayMask;

    gl_FragColor = vec4(cloudColor, alpha);
  }
`;

// Earth surface shader — day/night blending with sun direction
const earthVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = /* glsl */ `
  uniform sampler2D uDayMap;
  uniform sampler2D uNightMap;
  uniform vec3 uSunPosition;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDir;

  void main() {
    vec3 sunDir = normalize(uSunPosition - vWorldPosition);
    float NdotL = dot(vWorldNormal, sunDir);

    vec3 dayColor = texture2D(uDayMap, vUv).rgb;
    vec3 nightColor = texture2D(uNightMap, vUv).rgb;

    // Soft terminator
    float terminator = smoothstep(-0.08, 0.2, NdotL);

    // Blend day and night
    vec3 col = mix(nightColor * 0.3, dayColor * terminator, terminator);

    // Limb darkening
    float NdotV = max(dot(vWorldNormal, vViewDir), 0.0);
    float limbDark = pow(NdotV, 0.35) * 0.4 + 0.6;
    col *= limbDark;

    // Ocean specular glint
    float spec = pow(max(dot(reflect(-sunDir, vWorldNormal), vViewDir), 0.0), 80.0);
    // Blue channel indicates ocean (rough heuristic)
    float oceanMask = step(dayColor.b, dayColor.g + 0.05) * step(dayColor.r, 0.3);
    col += vec3(1.0, 0.97, 0.88) * spec * oceanMask * 0.25 * terminator;

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface EarthGlobeProps {
  config: PlanetConfig;
  progressRef: React.RefObject<number>;
}

export function EarthGlobe({ config, progressRef }: EarthGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const labelsRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const showLabelsRef = useRef(false);
  const activeCity = useFootprintsStore((s) => s.activeCity);

  // Load NASA textures
  const [dayMap, nightMap] = useTexture([
    '/textures/earth/earth_day_4k.jpg',
    '/textures/earth/earth_night_4k.jpg',
  ]);

  // Custom shader for day/night blending with sun direction
  const earthUniforms = useMemo(() => ({
    uDayMap: { value: dayMap },
    uNightMap: { value: nightMap },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
  }), [dayMap, nightMap]);

  const cloudUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
  }), []);

  const atmosphereUniforms = useMemo(() => ({
    uAtmosphereColor: { value: new THREE.Color('#6BAFE8') },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
  }), []);

  // Compute city positions on sphere
  const cityPositions = useMemo(() => {
    return cities.map((city) => {
      const pos = latLngToVector3(city.lat, city.lng, config.radius * 1.01);
      return {
        city,
        position: [pos.x, pos.y, pos.z] as [number, number, number],
      };
    });
  }, [config.radius]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    cloudUniforms.uTime.value = timeRef.current;

    // Pause rotation when a city is selected so user can browse photos
    const speed = activeCity ? 0 : config.rotationSpeed;
    if (meshRef.current) {
      meshRef.current.rotation.y += speed;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += speed * 1.08;
    }
    // Rotate city labels with the Earth surface
    if (labelsRef.current) {
      labelsRef.current.rotation.y += speed;
    }

    // Only show city labels when camera is near Earth (projects/footprints sections)
    const progress = progressRef.current ?? 0;
    const shouldShow = progress >= 0.38 && progress <= 0.66;
    if (shouldShow !== showLabelsRef.current) {
      showLabelsRef.current = shouldShow;
      if (labelsRef.current) {
        labelsRef.current.visible = shouldShow;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={config.position}
      rotation={[config.tilt || 0, 0, 0]}
    >
      {/* Earth surface with NASA textures */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[config.radius, 64, 64]} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={earthUniforms}
          toneMapped={false}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[config.radius * 1.005, 48, 48]} />
        <shaderMaterial
          vertexShader={cloudVertexShader}
          fragmentShader={cloudFragmentShader}
          uniforms={cloudUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[config.radius * 1.1, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={atmosphereUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* City labels — rotate with Earth, only visible near Earth */}
      <group ref={labelsRef} visible={false}>
        {cityPositions.map(({ city, position }) => (
          <CityLabel key={city.id} city={city} position={position} />
        ))}
      </group>

      {/* Subtle glow */}
      <pointLight
        intensity={0.3}
        color="#4B8BBE"
        distance={config.radius * 8}
        decay={2}
      />
    </group>
  );
}
