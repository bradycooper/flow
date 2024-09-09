import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProgramMetrics } from '../types';
import '../styles/Report.css';

interface ReportData {
  decisions: { question: string; answer: string }[];
  metrics: ProgramMetrics;
}

const Report: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const encodedData = searchParams.get('data');
    if (encodedData) {
      try {
        const decodedData: ReportData = JSON.parse(decodeURIComponent(encodedData));
        console.log('Decoded data:', decodedData);
        setReportData(decodedData);
      } catch (error) {
        console.error('Error parsing report data:', error);
      }
    }
  }, [location]);

  if (!reportData) {
    return <div className="loading">Loading report...</div>;
  }

  return (
    <div className="report-container">
      <header className="report-header">
        <h1>AI-Generated Reward Program Report</h1>
      </header>
      <main className="report-content">
        <section className="metrics-analysis">
          <h2>Metrics Analysis</h2>
          <div className="metrics-grid">
            <div className="metric-item">
              <h3>Estimated Cost</h3>
              <p className="metric-value">${reportData.metrics.estimatedCost.toFixed(2)}</p>
              <p className="metric-description">This is the projected cost to implement and maintain your reward program.</p>
            </div>
            <div className="metric-item">
              <h3>Potential Revenue</h3>
              <p className="metric-value">${reportData.metrics.potentialRevenue.toFixed(2)}</p>
              <p className="metric-description">This is the estimated revenue that could be generated from the program.</p>
            </div>
            <div className="metric-item">
              <h3>ROI</h3>
              <p className="metric-value">{reportData.metrics.roi.toFixed(2)}%</p>
              <p className="metric-description">Return on Investment shows the efficiency of your program in generating revenue.</p>
            </div>
            <div className="metric-item">
              <h3>Customer Retention Rate</h3>
              <p className="metric-value">{reportData.metrics.customerRetentionRate.toFixed(2)}%</p>
              <p className="metric-description">This metric indicates the percentage of customers likely to remain loyal due to the program.</p>
            </div>
          </div>
        </section>
        
        <section className="program-details">
          <h2>Program Details</h2>
          <div className="details-grid">
            {reportData.decisions.map((decision, index) => (
              <div key={index} className="detail-item">
                <h3>{decision.question}</h3>
                <p>{decision.answer}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="recommendations">
          <h2>AI Recommendations</h2>
          <ul>
            {generateRecommendations(reportData).map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

function generateRecommendations(data: ReportData): string[] {
  // This is a placeholder. In a real application, you'd use more sophisticated logic or an AI service.
  return [
    "Consider A/B testing different reward structures to optimize engagement.",
    "Implement a robust tracking system to measure the program's impact on customer behavior.",
    "Regularly communicate with participants to gather feedback and improve the program.",
    "Analyze customer segments to tailor rewards to different groups' preferences.",
  ];
}

export default Report;