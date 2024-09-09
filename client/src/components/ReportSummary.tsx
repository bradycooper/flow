import React from 'react';
import { ProgramMetrics } from '../utils/metrics';

interface ReportSummaryProps {
  decisionTree: { [key: number]: string };
  metrics: ProgramMetrics;
  questions: string[];
}

const ReportSummary: React.FC<ReportSummaryProps> = ({ decisionTree, metrics, questions }) => {
  return (
    <div className="report-summary">
      <h2>Report Summary</h2>
      <h3>Your Decisions:</h3>
      <ul>
        {Object.entries(decisionTree).map(([index, answer]) => (
          <li key={index}>
            <strong>{questions[parseInt(index)]}:</strong> {answer}
          </li>
        ))}
      </ul>
      <h3>Program Metrics:</h3>
      <ul>
        <li>Estimated Cost: ${metrics.estimatedCost}</li>
        <li>Potential Revenue: ${metrics.potentialRevenue}</li>
        <li>ROI: {metrics.roi}%</li>
        <li>Customer Retention Rate: {metrics.customerRetentionRate}%</li>
      </ul>
    </div>
  );
};

export default ReportSummary;