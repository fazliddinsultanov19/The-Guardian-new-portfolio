
import React from 'react';
import { ExperienceItem, Skill, PortfolioSource } from './types';

export const HERO_NAME = "FAZLIDDIN SULTANOV";
export const HERO_SUBTITLE = "Graphic Designer • Creative Thinker • Orator";
export const HERO_STATEMENT = "Design is not decoration. It is decision.";

export const ABOUT_CONTENT = [
  "I am a passionate and detail-oriented Graphic Designer with strong skills in branding, social media design, and outdoor advertising.",
  "Currently, I am a 3rd-year Computer Engineering student at Fergana State Technical University and also work as a Freelance Designer.",
  "I combine creativity, critical thinking, and strong oratory skills to create meaningful visual systems."
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: "2024 – PRESENT",
    role: "FREELANCE GRAPHIC DESIGNER",
    details: [
      "Branding for Instagram, Facebook, Telegram",
      "SMD designs and outdoor advertising",
      "Client collaboration"
    ]
  },
  {
    period: "2023",
    role: "OFFICE SOFTWARE INSTRUCTOR – MEGA ZIYO",
    details: [
      "Microsoft Word, Excel, PowerPoint",
      "Practical teaching"
    ]
  }
];

export const SKILLS_TOOLS: Skill[] = [
  { name: "PHOTOSHOP", level: 90 },
  { name: "ILLUSTRATOR", level: 75 },
  { name: "CORELDRAW", level: 70 },
  { name: "INDESIGN", level: 60 },
  { name: "FIGMA", level: 55 }
];

export const SOFT_SKILLS = [
  "CREATIVITY",
  "CRITICAL THINKING",
  "TIME MANAGEMENT",
  "PROBLEM SOLVING",
  "PUBLIC SPEAKING"
];

export const LANGUAGES = [
  "UZBEK — NATIVE (C2)",
  "ENGLISH — ADVANCED (C1)",
  "RUSSIAN — UPPER-INTERMEDIATE (B2)",
  "TURKISH — INTERMEDIATE"
];

export const PORTFOLIO_SOURCES: PortfolioSource[] = [
  { platform: "PINTEREST", url: "https://www.pinterest.com/fazliddin_designs/" },
  { platform: "BEHANCE", url: "https://www.behance.net/fazliddinsultanov" },
  { platform: "TELEGRAM", url: "https://t.me/fazliddin_designs" }
];

export const CONTACT_INFO = {
  email: "fazliddinsultanov19@gmail.com",
  phone: "+998 93 807 68 86",
  telegram: "t.me/fazliddin_designs"
};
