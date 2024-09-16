import { UserInfo, ProgramMetrics, Question, Decision, AIResponse, ReportData } from '../types';

export async function generateReportData(
  answers: { [key: string]: string },
  metrics: ProgramMetrics,
  userInfo: UserInfo,
  questions: Question[]
): Promise<ReportData> {
  const decisions: Decision[] = questions.map(question => ({
    type: question.type,
    value: question.options.find(option => option.id === answers[question.id])?.text || 'Not answered',
    question: question.text,
    answer: question.options.find(option => option.id === answers[question.id])?.text || 'Not answered',
  }));

  try {
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selections: decisions }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI report');
    }

    const { report }: { report: AIResponse } = await response.json();

    return {
      answers,
      metrics,
      userInfo,
      questions,
      aiReport: report,
    };
  } catch (error) {
    console.error('Error generating AI report:', error);
    throw error;
  }
}

export function generateReportUrl(reportData: ReportData): string {
  const encodedData = encodeURIComponent(JSON.stringify(reportData));
  return `/report?data=${encodedData}`;
}