import React from 'react';
import '../styles/Results.css';


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

  console.log('Rendering Results component');
  console.log('Questions:', questions);
  console.log('Selected Answers:', selectedAnswers);
  console.log('Metrics:', metrics);

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

      <div className="variations-highlight">
        <h2>Program Variations</h2>
        <div className="variations-box">
          <p className="variations-number">8,103,360</p>
          <p className="variations-text">different ways</p>
          <p className="variations-description">to create different programs!</p>
          <p className="variations-emphasis">This is 1 in 8 million.</p>
        </div>
      </div>

    </div>
  );
};

export default Results;