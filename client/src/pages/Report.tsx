import React, { useEffect, useState } from 'react';
import { Question, ProgramMetrics } from '../types';
import '../styles/Report.css';

interface ReportData {
  questions: Question[];
  selectedAnswers: { [key: number]: string };
  metrics: ProgramMetrics;
}

const Report: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = searchParams.get('data');
    if (encodedData) {
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      setReportData(decodedData);
    }
  }, []);

  if (!reportData) return <div>Loading report...</div>;

  const { questions, selectedAnswers, metrics } = reportData;

  return (
    <div className="report-container">
      <header className="report-header">
        <h1>Reward Program Analysis Report</h1>
      </header>
      <div className="report-content">
        <section className="metrics-overview">
          <h2>Key Metrics</h2>
          <div className="metrics-grid">
            <MetricBox title="Implementation Time" value={metrics.implementationTime} />
            <MetricBox title="Estimated Cost" value={metrics.cost} />
            <MetricBox title="Next Steps" value={`${metrics.nextSteps.length} steps`} />
          </div>
        </section>
        <section className="program-details">
          <h2>Program Configuration</h2>
          <div className="config-table-container">
            <table className="config-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Selected Answer</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={question.id}>
                    <td>{question.text}</td>
                    <td>{selectedAnswers[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="next-steps">
          <h2>Implementation Roadmap</h2>
          <ol className="steps-list">
            {metrics.nextSteps.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
        <section className="technical-analysis">
          <h2>Technical Analysis</h2>
          <div className="tech-details">
            <h3>System Architecture</h3>
            <p>Based on the selected configuration, we recommend a microservices architecture with the following components:</p>
            <ul>
              <li>User Management Service</li>
              <li>Reward Calculation Engine</li>
              <li>Points Database (NoSQL)</li>
              <li>Analytics and Reporting Module</li>
              <li>API Gateway for Third-party Integrations</li>
            </ul>
            <h3>Scalability Considerations</h3>
            <p>The proposed system is designed to handle up to 1 million active users with an average response time of &lt;100ms. Horizontal scaling can be implemented to accommodate future growth.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

const MetricBox: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div className="metric-box">
      <h3>{title}</h3>
      <p className="metric-value">{value}</p>
    </div>
  );
};

export default Report;