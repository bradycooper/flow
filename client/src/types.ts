export interface Question {
  id: string;
  text: string;
  questionDescription?: string;
  answers: Answer[];
}

export interface Answer {
  name: string;
  shortDescription: string;
  longDescription: string;
}

export interface ProgramMetrics {
  estimatedCost: number;
  potentialRevenue: number;
  roi: number;
  customerRetentionRate: number;
  implementationTime?: string; // Make this optional
  nextSteps?: string[]; // Make this optional
}
