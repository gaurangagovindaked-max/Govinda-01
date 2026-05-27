
export type Theme = 'light' | 'dark';

export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  metric: string;
  link?: string;
  image?: string;
  proof?: string;
}

export interface ResearchItem {
  title: string;
  subtitle: string;
  points: string[];
  link?: string;
}
