import React from 'react';
import '../styles/FlowChart.css';

// Define types locally (same as in FlowChart.tsx)
type Question = {
  id: string;
  text: string;
  answers: Answer[];
  questionDescription?: string;
};

type Answer = {
  name: string;
  description: string;
  shortDescription: string;
  longDescription: string;
};

type ProgramMetrics = {
  estimatedCost: number;
  // Remove projectedEngagement
};

const Results: React.FC<{
  questions: Question[];
  selectedAnswers: {[key: number]: string};
  metrics: ProgramMetrics;
}> = ({ questions, selectedAnswers, metrics }) => {
  return (
    <div className="results-container">
      <h1>Reward Program Summary</h1>
      <div className="decision-tree-summary">
        <h2>Your Choices</h2>
        {questions.map((question, index) => (
          <div key={question.id || `decision-${index}`} className="decision-item">
            <h3>{question.text}</h3>
            <p>{selectedAnswers[index]}</p>
          </div>
        ))}
      </div>
      <div className="program-metrics">
        <h2>Program Metrics</h2>
        <p>Estimated Cost: ${metrics.estimatedCost}</p>
      </div>
    </div>
  );
};

export default Results;