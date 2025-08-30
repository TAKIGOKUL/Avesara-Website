export type Theme = 'light' | 'dark';

export interface Opportunity {
  id: number;
  type: 'job' | 'internship' | 'event';
  title: string;
  company: string;
  description: string;
  deadline: string;
  location: string;
  image: string;
  link: string;
}

export interface PostAlertFormData {
  title: string;
  type: 'job' | 'internship' | 'event';
  description: string;
  deadline: string;
  link: string;
  role: string;
  date: string;
}
