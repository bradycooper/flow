import React from 'react';
import { Question } from '../types';
import '../styles/DecisionTreeSummary.css';

interface DecisionTreeSummaryProps {
  questions: Question[];
  selectedAnswers: { [key: number]: string };
  onReset: () => void;
}

const DecisionTreeSummary: React.FC<DecisionTreeSummaryProps> = ({ questions, selectedAnswers, onReset }) => {
  const answeredQuestions = questions.filter((_, index) => selectedAnswers[index]);

  return (
    <div className="decision-tree-summary">
      <h2 className="summary-title">Summary</h2>
      <div className="summary-content">
        {answeredQuestions.map((question, index) => (
          <div key={question.id || `decision-${index}`} className="summary-item">
            <span className="summary-question">{question.text}</span>
            <span className="summary-answer">{selectedAnswers[questions.indexOf(question)]}</span>
          </div>
        ))}
      </div>
      <button onClick={onReset} className="summary-reset-button">
        Reset
      </button>
    </div>
  );
};

export default DecisionTreeSummary;