import React from 'react';
import { Question } from '../types';
import '../styles/ProgramOverviewPopup.css';

interface ProgramOverviewPopupProps {
  questions: Question[];
  selectedAnswers: { [key: number]: string };
  onGenerateReport: () => void;
  onReset: () => void;
  onClose: () => void;
}

const ProgramOverviewPopup: React.FC<ProgramOverviewPopupProps> = ({
  questions,
  selectedAnswers,
  onGenerateReport,
  onReset,
  onClose,
}) => {
  return (
    <div className="program-overview-popup">
      <h2>Program Overview</h2>
      <div className="overview-content">
        {questions.map((question, index) => (
          <div key={question.id} className="overview-item">
            <h3>{question.text}</h3>
            <p>{selectedAnswers[index]}</p>
          </div>
        ))}
      </div>
      <div className="overview-actions-wrapper">
        <div className="overview-actions">
          <button onClick={onGenerateReport} className="action-button generate">Generate Report</button>
          <button onClick={onReset} className="action-button reset">Start Over</button>
          <button onClick={onClose} className="action-button close">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProgramOverviewPopup;