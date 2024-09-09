import { Question } from '../types';
import { ProgramMetrics } from './metrics';

export const generateReportUrl = (
  questions: Question[],
  selectedAnswers: { [key: number]: string },
  metrics: ProgramMetrics
): string => {
  const reportData = {
    decisions: questions.map((q, index) => ({
      question: q.text,
      answer: selectedAnswers[index],
    })),
    metrics: metrics,
  };

  const encodedData = encodeURIComponent(JSON.stringify(reportData));
  return `/report?data=${encodedData}`;
};