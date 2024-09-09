import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import '../styles/ProgramOverviewPopup.css'; // Make sure this file exists

interface ProgramOverviewPopupProps {
  questions: Question[];
  selectedAnswers: { [key: number]: string };
  onGenerateReport: () => Promise<void>; // Change this to return a Promise
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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const generateLoadingTexts = () => {
    return Object.values(selectedAnswers).map(answer => `Calculating ${answer}`);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      const loadingTexts = generateLoadingTexts();
      let index = 0;
      interval = setInterval(() => {
        setLoadingText(loadingTexts[index]);
        index = (index + 1) % loadingTexts.length;
      }, 1000);

      // Start report generation immediately
      const generateReportPromise = onGenerateReport();

      // Wait for both the loading animation and report generation to complete
      Promise.all([
        new Promise(resolve => setTimeout(resolve, 3000)),
        generateReportPromise
      ]).then(() => {
        setIsLoading(false);
        clearInterval(interval);
      });
    }
    return () => clearInterval(interval);
  }, [isLoading, selectedAnswers, onGenerateReport]);

  const handleGenerateReport = () => {
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div className="program-overview-popup">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading</h2>
          <p>{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="program-overview-popup">
      <div className="program-overview-content">
        <h2 className="overview-title">Your Program Overview</h2>
        <div className="questions-container">
          {questions.map((question, index) => (
            <div key={question.id} className="question-answer-pair">
              <p className="question"><strong>Q: {question.text}</strong></p>
              <p className="answer">{selectedAnswers[index]}</p>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={onReset} className="reset-button">
            Reset
          </button>
          <button onClick={handleGenerateReport} className="generate-report-button">
            Generate My Report
          </button>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramOverviewPopup;