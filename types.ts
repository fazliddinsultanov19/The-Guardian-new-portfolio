
export interface ExperienceItem {
  period: string;
  role: string;
  details: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface PortfolioSource {
  platform: string;
  url: string;
}

export interface SystemStatus {
  isBooted: boolean;
  accessGranted: boolean;
}
