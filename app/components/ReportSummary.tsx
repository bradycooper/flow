import React from 'react';

interface ReportSummaryProps {
  decisionTree: any; // Replace 'any' with the actual type of your decision tree
  metrics: {
    implementationTime: string;
    cost: string;
    nextSteps: string[];
  };
}

export function ReportSummary({ decisionTree, metrics }: ReportSummaryProps) {
  const generateAIResponse = () => {
    // Implement AI response generation logic here
    return "This intricate program leverages cutting-edge algorithms and state-of-the-art technologies to revolutionize your business processes. By implementing this sophisticated solution, you'll be at the forefront of innovation in your industry.";
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Program Summary Report</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricBox title="Implementation Time" value={metrics.implementationTime} />
        <MetricBox title="Estimated Cost" value={metrics.cost} />
        <MetricBox title="Next Steps" value={`${metrics.nextSteps.length} steps`} />
      </div>
      <h3 className="text-2xl font-semibold mb-4">AI Analysis</h3>
      <p className="mb-6 text-gray-700">{generateAIResponse()}</p>
      <h3 className="text-2xl font-semibold mb-4">Program Details</h3>
      <pre className="bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-60">
        {JSON.stringify(decisionTree, null, 2)}
      </pre>
      <h3 className="text-2xl font-semibold mb-4">Next Steps</h3>
      <ol className="list-decimal list-inside">
        {metrics.nextSteps.map((step, index) => (
          <li key={index} className="mb-2">{step}</li>
        ))}
      </ol>
    </div>
  );
}

function MetricBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}