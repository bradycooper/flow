export interface Answer {
  id: string;
  text: string;
  name: string;
  description?: string;
}

export interface Decision {
  type: string;
  value: string;
  question: string;
  answer: string;
}

export interface Metrics {
  design: string;
  implementation: string;
  monitoring: string;
  launch: string;
  marketing: string;
  setupTime: string;
  maintenanceTime: string;
  estimatedCost: number;
  rolesNeeded: string[];
}

export interface AIResponse {
  summary: string;
  marketingSteps: string[];
  considerations: string[];
  metrics: Metrics;
}

export interface ReportData {
  answers: { [key: string]: string };
  metrics: ProgramMetrics;
  userInfo: UserInfo;
  questions: Question[];
  aiReport: AIResponse;
}

export interface ProgramMetrics {
  // Define properties as needed
}

export interface UserInfo {
  name: string;
  email: string;
  companyName: string;
  revenue: string;
}

export interface Question {
  id: string;
  text: string;
  type: string;
  description?: string;
  options: Option[];
}

export interface Option {
  id: string;
  name: string;
  text: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
}
