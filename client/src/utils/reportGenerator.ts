import { Question, ProgramMetrics } from '../types';

export function generateReportUrl(
  questions: Question[],
  selectedAnswers: { [key: number]: string },
  metrics: ProgramMetrics
): string {
  const encodedData = encodeURIComponent(JSON.stringify({ questions, selectedAnswers, metrics }));
  return `/report?data=${encodedData}`;
}