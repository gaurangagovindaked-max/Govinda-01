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

/** Publications-style entry (year, venue/context, short abstract). */
export interface Publication {
  year: string;
  title: string;
  venue: string;
  summary: string;
  link?: string;
  kind: 'architecture' | 'lab-notes' | 'artifact' | 'analysis';
}

export interface EditorialFigure {
  id: string;
  caption: string;
  bars: { label: string; value: number; note?: string }[];
  maxValue?: number;
}

export interface EditorialNote {
  id: string;
  title: string;
  dek: string;
  body: string[];
  figure?: EditorialFigure;
  pipeline?: string[];
  link?: string;
  linkLabel?: string;
}

export interface StripCard {
  title: string;
  category: string;
  description: string;
  link?: string;
  project?: Project;
}
