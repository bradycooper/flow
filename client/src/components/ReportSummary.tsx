import React from 'react';
import { ProgramMetrics } from '../utils/metrics';
import '../styles/ReportSummary.css';

interface ReportSummaryProps {
  decisionTree: { [key: number]: string };
  metrics: ProgramMetrics;
}

const ReportSummary: React.FC<ReportSummaryProps> = ({ decisionTree, metrics }) => {
  return (
    <div className="report-summary-container">
      <header className="report-header">
        <h1>Program Summary Report</h1>
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
          <h2>Program Details</h2>
          <pre className="decision-tree">
            {JSON.stringify(decisionTree, null, 2)}
          </pre>
        </section>
        <section className="next-steps">
          <h2>Implementation Roadmap</h2>
          <ol className="steps-list">
            {metrics.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
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

export default ReportSummary;