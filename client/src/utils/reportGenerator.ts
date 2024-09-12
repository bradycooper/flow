import { UserInfo, ProgramMetrics, Question } from '../types';

export function generateReportUrl(
  answers: { [key: string]: string },
  metrics: ProgramMetrics,
  userInfo: UserInfo,
  questions: Question[]
): string {
  const decisions = questions.map(question => ({
    question: question.text,
    answer: question.options.find(option => option.id === answers[question.id])?.text || 'Not answered'
  }));

  const reportData = {
    decisions,
    metrics,
    userInfo
  };

  const encodedData = encodeURIComponent(JSON.stringify(reportData));
  return `/report?data=${encodedData}`;
}