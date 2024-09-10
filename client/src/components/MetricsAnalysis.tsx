import React from 'react';
import styles from './MetricsAnalysis.module.css';

interface MetricsAnalysisProps {
  flowChartData: any;
  formData: any;
  withoutKwikCost: number;
  potentialRevenue: { revenue: number; percentageIncrease: number };
  withoutKwikTimeline: string;
  kwikSuccessScore: { score: number; successRate: number };
}

const MetricsAnalysis: React.FC<MetricsAnalysisProps> = ({
  withoutKwikCost,
  potentialRevenue,
  withoutKwikTimeline,
  kwikSuccessScore,
}) => {
  return (
    <div className={styles.metricsAnalysis}>
      <h2>Metrics Analysis</h2>
      <div className={styles.metricsGrid}>
        <div className={styles.metricBox}>
          <h3>Without Kwik Estimated Cost</h3>
          <p>${withoutKwikCost.toLocaleString()}</p>
          <p>This is the total cost of what it would take to create this program on your own based on the program you created.</p>
        </div>
        <div className={styles.metricBox}>
          <h3>Potential Revenue</h3>
          <p>${potentialRevenue.revenue.toLocaleString()} (+{potentialRevenue.percentageIncrease}%)</p>
          <p>This is what revenue could be created from a program like this and include a % increase from your current revenue.</p>
        </div>
        <div className={styles.metricBox}>
          <h3>Without Kwik Estimated Timeline</h3>
          <p>{withoutKwikTimeline}</p>
          <p>This is how long it could take to implement a program like this without using Kwik.</p>
        </div>
        <div className={styles.metricBox}>
          <h3>Kwik Success Score</h3>
          <p>{kwikSuccessScore.score}/100</p>
          <p>{kwikSuccessScore.successRate}% success rate with your score!</p>
          <p>This is how well your brand scores in our metrics to determine if you're a good brand for us to work with!</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsAnalysis;