import { Question as QuestionType } from '../types';

function Question({ question }: { question: QuestionType }) {
  return (
    <div className="question-container">
      <h2 className="question-header">{question.text}</h2>
      {/* ... rest of the question content ... */}
    </div>
  );
}

export default Question;