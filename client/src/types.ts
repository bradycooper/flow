export interface Question {
  id: string;
  text: string;  // Changed from 'question' to 'text'
  answers: Answer[];
}

export interface Answer {
  name: string;
  shortDescription: string;
  longDescription: string;
}

export interface ProgramMetrics {
  implementationTime: string;
  cost: string;
  nextSteps: string[];
}
