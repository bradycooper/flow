import React from 'react';
import { Answer } from '../types';

interface AnswerCardProps {
  answer: Answer;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, isSelected, isDisabled, onSelect }) => {
  const notionPageUrl = "https://pages.kwik.com/Cashback-Reward-Module-Kwik-d5fd05412c524217a32a35cd34bda52d?pvs=4";

  console.log('Answer object:', answer);
  console.log('Answer name:', answer.name);
  console.log('Answer short description:', answer.shortDescription);

  return (
    <div
      className={`answer-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
      onClick={!isDisabled ? onSelect : undefined}
    >
      <h3>{answer.name}</h3>
      {answer.shortDescription ? (
        <p className="answer-description">{answer.shortDescription}</p>
      ) : (
        <p className="answer-description">No description available</p>
      )}
      <a
        href={notionPageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="view-more-link"
        onClick={(e) => e.stopPropagation()}
      >
        View More
      </a>
    </div>
  );
};

export default AnswerCard;