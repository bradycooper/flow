import React from 'react';
import { Answer } from '../types';

interface AnswerModalProps {
  answer: Answer;
  onClose: () => void;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ answer, onClose }) => {
  return (
    <div className="answer-modal">
      <h2>{answer.name}</h2>
      <p>{answer.longDescription}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AnswerModal;