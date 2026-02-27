// ── Design System Colors ──
export const colors = {
  void: '#000000',
  voidElevated: '#080808',
  voidSurface: '#111111',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.70)',
  textTertiary: 'rgba(255,255,255,0.45)',
  textMuted: 'rgba(255,255,255,0.25)',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.10)',
} as const;

// ── Planet Colors ──
export const planetColors = {
  sun: '#D0D0D8',
  mercury: '#8C8C8C',
  venus: '#E8CDA0',
  earth: '#4B8BBE',
  mars: '#C1440E',
  jupiter: '#C88B3A',
  saturn: '#DAA520',
  uranus: '#73D8E8',
  neptune: '#3454D1',
} as const;

// ── Planet-to-Section Mapping ──
export const sectionPlanet: Record<string, keyof typeof planetColors> = {
  hero: 'sun',
  about: 'mercury',
  experience: 'venus',
  projects: 'earth',
  footprints: 'earth',
  skills: 'mars',
  interests: 'jupiter',
  achievements: 'saturn',
  contact: 'neptune',
};

// ── Planet Config for 3D Scene ──
export interface PlanetConfig {
  name: string;
  position: [number, number, number];
  radius: number;
  colors: { primary: string; secondary: string; tertiary?: string };
  rotationSpeed: number;
  noiseScale: number;
  hasAtmosphere: boolean;
  atmosphereColor?: string;
  hasRings?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringColor?: string;
  tilt?: number; // axial tilt in radians
  oblateness?: number; // 0 = perfect sphere, 0.098 = Saturn
  type: 'rocky' | 'gas' | 'ice';
}

// Planets scattered across 3D space (not in a line)
export const planetConfigs: PlanetConfig[] = [
  {
    name: 'mercury',
    position: [5.5, 2.0, -3.5],
    radius: 0.3,
    colors: { primary: '#8C8C8C', secondary: '#555555', tertiary: '#A8A0A0' },
    rotationSpeed: 0.002,
    noiseScale: 4.0,
    hasAtmosphere: false,
    type: 'rocky',
  },
  {
    name: 'venus',
    position: [-8.0, -2.5, 6.0],
    radius: 0.55,
    colors: { primary: '#E8CDA0', secondary: '#D4B978', tertiary: '#C4A862' },
    rotationSpeed: 0.001,
    noiseScale: 2.0,
    hasAtmosphere: true,
    atmosphereColor: '#E8C878',
    type: 'rocky',
  },
  {
    name: 'earth',
    position: [3.0, 6.0, 14.0],
    radius: 0.6,
    colors: { primary: '#1A3A6A', secondary: '#2A6B3A', tertiary: '#6B8F50' },
    rotationSpeed: 0.0008,
    noiseScale: 2.5,
    hasAtmosphere: true,
    atmosphereColor: '#6BAFE8',
    type: 'rocky',
  },
  {
    name: 'mars',
    position: [14.0, -6.0, -10.0],
    radius: 0.4,
    colors: { primary: '#C1440E', secondary: '#6B2A0A', tertiary: '#D4724A' },
    rotationSpeed: 0.0028,
    noiseScale: 3.0,
    hasAtmosphere: false,
    type: 'rocky',
  },
  {
    name: 'jupiter',
    position: [-18.0, 4.0, -22.0],
    radius: 1.4,
    colors: { primary: '#C88B3A', secondary: '#7A4E1A', tertiary: '#E8D0A0' },
    rotationSpeed: 0.006,
    noiseScale: 1.5,
    hasAtmosphere: false,
    oblateness: 0.065,
    type: 'gas',
  },
  {
    name: 'saturn',
    position: [25.0, -3.0, 20.0],
    radius: 1.2,
    colors: { primary: '#DAA520', secondary: '#B8882A', tertiary: '#E8D48C' },
    rotationSpeed: 0.005,
    noiseScale: 1.5,
    hasAtmosphere: false,
    hasRings: true,
    ringInnerRadius: 1.4,
    ringOuterRadius: 2.3,
    ringColor: '#C8B070',
    tilt: 0.47,
    oblateness: 0.098,
    type: 'gas',
  },
  {
    name: 'uranus',
    position: [-12.0, 15.0, -38.0],
    radius: 0.8,
    colors: { primary: '#73D8E8', secondary: '#5BC0C8', tertiary: '#A0E8F0' },
    rotationSpeed: 0.004,
    noiseScale: 1.0,
    hasAtmosphere: true,
    atmosphereColor: '#73D8E8',
    hasRings: true,
    ringInnerRadius: 1.15,
    ringOuterRadius: 1.5,
    ringColor: '#3A4A50',
    tilt: 1.71,
    oblateness: 0.023,
    type: 'ice',
  },
  {
    name: 'neptune',
    position: [8.0, -8.0, -52.0],
    radius: 0.75,
    colors: { primary: '#2040B0', secondary: '#152870', tertiary: '#5070E0' },
    rotationSpeed: 0.003,
    noiseScale: 1.2,
    hasAtmosphere: true,
    atmosphereColor: '#3454D1',
    oblateness: 0.017,
    type: 'ice',
  },
];

// ── Section Scroll Ranges ──
export const sectionRanges = {
  void:         [0.00, 0.07],
  hero:         [0.07, 0.17],
  about:        [0.17, 0.28],
  experience:   [0.28, 0.42],
  projects:     [0.42, 0.52],
  footprints:   [0.52, 0.62],
  skills:       [0.62, 0.72],
  interests:    [0.72, 0.82],
  achievements: [0.82, 0.92],
  contact:      [0.92, 1.00],
} as const;

// ── Section IDs for navigation ──
export const sectionIds = [
  'hero',
  'about',
  'experience',
  'projects',
  'footprints',
  'skills',
  'interests',
  'achievements',
  'contact',
] as const;

export type SectionId = (typeof sectionIds)[number];

// ── Camera Keyframes — 3D Solar System Flythrough ──
// Visit order: Sun → Mercury → Venus → Earth → Mars → Jupiter → Saturn → Uranus (flyby) → Neptune
// [scrollProgress, [camX, camY, camZ], [lookAtX, lookAtY, lookAtZ]]
export const cameraKeyframes: [number, [number, number, number], [number, number, number]][] = [
  // Wide view — distant overview of scattered solar system
  [0.00, [0, 10, 60],         [0, 0, 0]],
  // Approaching Sun (Hero)
  [0.08, [0, 3, 10],          [0, 0, 0]],
  [0.14, [3, 1.5, 5],         [0, 0, 0]],
  // Mercury (About) — approach from above-right
  [0.20, [8.0, 4.5, -1.0],    [5.5, 2.0, -3.5]],
  // Venus (Experience) — sweep to opposite side, below
  [0.33, [-5.5, -5.0, 8.5],   [-8.0, -2.5, 6.0]],
  // Earth (Projects) — rise up, approach from side
  [0.45, [5.5, 8.5, 16.5],    [3.0, 6.0, 14.0]],
  // Earth (Footprints) — orbit around Earth, zoomed in close
  [0.55, [4.0, 7.0, 15.5],    [3.0, 6.0, 14.0]],
  // Mars (Skills) — dive down to approach
  [0.66, [17.0, -3.0, -7.5],  [14.0, -6.0, -10.0]],
  // Jupiter (Interests) — sweep far left
  [0.76, [-15.0, 7.0, -19.0], [-18.0, 4.0, -22.0]],
  // Saturn (Achievements) — sweep to far right
  [0.86, [28.0, 0.0, 23.5],   [25.0, -3.0, 20.0]],
  // Uranus flyby + approach Neptune (Contact)
  [0.94, [5.0, -4.0, -48.0],  [8.0, -8.0, -52.0]],
  // Pull back from Neptune — farewell
  [1.00, [15.0, 2.0, -45.0],  [8.0, -8.0, -52.0]],
];

// ── Performance Tiers ──
export const performanceTiers = {
  high: {
    particleCount: 5000,
    dpr: [1, 2] as [number, number],
    enableBloom: true,
  },
  medium: {
    particleCount: 3000,
    dpr: [1, 1.5] as [number, number],
    enableBloom: true,
  },
  low: {
    particleCount: 1500,
    dpr: [1, 1] as [number, number],
    enableBloom: false,
  },
} as const;
