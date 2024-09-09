export interface ProgramMetrics {
  estimatedCost: number;
  potentialRevenue: number;
  roi: number;
  customerRetentionRate: number;
}

export const generateProgramMetrics = async (selectedAnswers: { [key: number]: string }): Promise<ProgramMetrics> => {
  // This is a placeholder implementation. In a real-world scenario, you'd likely call an API to calculate these metrics.
  const estimatedCost = Math.random() * 10000;
  const potentialRevenue = estimatedCost * (1 + Math.random());
  const roi = ((potentialRevenue - estimatedCost) / estimatedCost) * 100;
  const customerRetentionRate = Math.random() * 100;

  return {
    estimatedCost: parseFloat(estimatedCost.toFixed(2)),
    potentialRevenue: parseFloat(potentialRevenue.toFixed(2)),
    roi: parseFloat(roi.toFixed(2)),
    customerRetentionRate: parseFloat(customerRetentionRate.toFixed(2)),
  };
};