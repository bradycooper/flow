export interface Question {
  id: string;
  text: string;
  description?: string;
  options: Answer[];
}

export interface Answer {
  id: string;
  name: string;
  text: string;
  description: string;
}

export interface ProgramMetrics {
  estimatedCost: number;
  potentialRevenue: number;
  roi: number;
  customerRetentionRate: number;
  implementationTime: string; // Change this line
  nextSteps: string[]; // Change this line
}

export interface ReportData {
  decisions: { question: string; answer: string }[];
  metrics: ProgramMetrics;
  userInfo: UserInfo;
}

export interface UserInfo {
  name: string;
  email: string;
  companyName: string;
  revenue: string;
}
