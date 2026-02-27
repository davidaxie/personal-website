export interface WorkEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  highlight?: string;
  technologies?: string[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  story?: string;
  impact?: string;
  technologies: string[];
  url?: string;
  github?: string;
  image?: string;
}

export interface InterestEntry {
  name: string;
  description: string;
  headline?: string;
  stat?: string;
}

export interface AchievementEntry {
  title: string;
  year: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; description: string }[];
}

export interface ContactInfo {
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface SiteContent {
  identity: {
    name: string;
    tagline: string;
    bio: string;
  };
  currently: { label: string; value: string }[];
  skills: SkillCategory[];
  work: WorkEntry[];
  projects: ProjectEntry[];
  interests: InterestEntry[];
  achievements: AchievementEntry[];
  contact: ContactInfo;
}
