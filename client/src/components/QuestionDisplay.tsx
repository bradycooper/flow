import React from 'react';
import { Question } from '../types';

interface QuestionDisplayProps {
  question: Question;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <div className="question-display">
      <h2>{question.text}</h2>
    </div>
  );
};

export default QuestionDisplay;