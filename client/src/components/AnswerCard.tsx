import React from 'react';
import { Answer } from '../types';

interface AnswerCardProps {
  answer: Answer;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, isSelected, isDisabled, onSelect }) => {
  return (
    <div
      className={`answer-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
      onClick={!isDisabled ? onSelect : undefined}
    >
      <h3>{answer.name || 'Unnamed Answer'}</h3>
      <p className="answer-description">
        {answer.shortDescription || 'No description available'}
      </p>
      {/* Remove the "View More" link for now to simplify */}
    </div>
  );
};

export default AnswerCard;