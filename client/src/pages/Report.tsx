import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReportData } from '../types';

const Report: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const encodedData = searchParams.get('data');
    if (encodedData) {
      const decodedData: ReportData = JSON.parse(decodeURIComponent(encodedData));
      setReportData(decodedData);
    }
  }, [location]);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  const { aiReport } = reportData;

  return (
    <div>
      <h1>AI-Generated Report</h1>
      <h2>Summary</h2>
      <p>{aiReport.summary}</p>
      <h2>Marketing Steps</h2>
      <ul>
        {aiReport.marketingSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <h2>Considerations</h2>
      <ul>
        {aiReport.considerations.map((consideration, index) => (
          <li key={index}>{consideration}</li>
        ))}
      </ul>
      <h2>Metrics</h2>
      <ul>
        <li>Design: {aiReport.metrics.design}</li>
        <li>Implementation: {aiReport.metrics.implementation}</li>
        <li>Monitoring: {aiReport.metrics.monitoring}</li>
        <li>Launch: {aiReport.metrics.launch}</li>
        <li>Marketing: {aiReport.metrics.marketing}</li>
        <li>Setup Time: {aiReport.metrics.setupTime}</li>
        <li>Maintenance Time: {aiReport.metrics.maintenanceTime}</li>
        <li>Estimated Cost: ${aiReport.metrics.estimatedCost}</li>
        <li>Roles Needed: {aiReport.metrics.rolesNeeded.join(', ')}</li>
      </ul>
    </div>
  );
};

export default Report;