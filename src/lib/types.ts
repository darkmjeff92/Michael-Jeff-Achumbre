export interface HeroSection {
  mainHeadline: string;
  subheadline: string;
  supportingPoints: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  primaryCTA: string;
  secondaryCTA: string;
  mobileVersion: {
    headline: string;
    description: string;
    cta: string;
  };
}

export interface AboutSection {
  story: string;
  mission: string;
  currentAvailability: {
    weekdays: string;
    weekends: string;
    communication: string;
  };
  keyPoints: Array<{
    period: string;
    description: string;
    skills: string[];
  }>;
}

export interface ServiceOffering {
  id: string;
  icon: string;
  title: string;
  whatIDo: string;
  yourEdge: string;
  perfectFor: string;
  timeline: string;
  description: string;
}

export interface ServicesSection {
  introduction: string;
  offerings: ServiceOffering[];
  availability: {
    weekdays: string;
    weekends: string;
    communication: string;
    projectWork: string;
  };
  workingPhilosophy: string;
}

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudyResult {
  title: string;
  description: string;
}

export interface CaseStudySection {
  title: string;
  client: string;
  challenge: string;
  timeline: string;
  reality: string;
  problem: {
    description: string;
    requirements: string[];
  };
  solution: {
    description: string;
    technologyStack: string[];
    aiApproach: string[];
    features: CaseStudyFeature[];
  };
  designChallenge: {
    problem: string;
    solution: string[];
    result: string;
  };
  results: CaseStudyResult[];
  proof: {
    description: string;
    liveUrl: string;
  };
}

export interface ContactMethod {
  platform: string;
  url: string;
  label: string;
}

export interface ProjectPhase {
  title: string;
  description: string;
  details: string[];
}

export interface ContactSection {
  introduction: string;
  consultation: {
    duration: string;
    bestTimes: string;
    discussionPoints: string[];
  };
  projectPhases: ProjectPhase[];
  workingSchedule: {
    weekdayComm: string[];
    weekendAvail: string[];
    benefits: string[];
  };
  contactInfo: {
    email: string;
    subjectLine: string;
    includeInfo: string[];
  };
  socialLinks: ContactMethod[];
  whyChooseMe: Array<{
    title: string;
    description: string;
  }>;
}

export interface PortfolioContent {
  hero: HeroSection;
  about: AboutSection;
  services: ServicesSection;
  caseStudy: CaseStudySection;
  contact: ContactSection;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
}