import React, { useState, useEffect, useRef } from 'react';
import QuestionDisplay from '../components/QuestionDisplay';
import AnswerCard from '../components/AnswerCard';
import ProgramOverviewPopup from '../components/ProgramOverviewPopup';
import { Question, Answer } from '../types';
import { generateProgramMetrics, ProgramMetrics } from '../utils/metrics';
import { generateReportUrl } from '../utils/reportGenerator';
import '../styles/FlowChart.css';

const FlowChart: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showProgramOverview, setShowProgramOverview] = useState(false);
  const [showReportSummary, setShowReportSummary] = useState(false);
  const [programMetrics, setProgramMetrics] = useState<ProgramMetrics | null>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const response = await fetch('http://localhost:3005/api/questions');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched questions:', data); // Add this line
      setQuestions(data);
      questionRefs.current = data.map(() => null);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  const handleAnswerSelect = (questionIndex: number, answerName: string): void => {
    setSelectedAnswers({...selectedAnswers, [questionIndex]: answerName});
    
    if (questionIndex === questions.length - 1) {
      console.log('Last question answered, calling handleLastQuestionAnswered');
      handleLastQuestionAnswered();
    } else {
      const nextQuestionIndex = questionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      
      setTimeout(() => {
        const nextQuestion = questionRefs.current[nextQuestionIndex];
        if (nextQuestion) {
          nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleLastQuestionAnswered = () => {
    console.log('Last question answered, showing program overview');
    setShowProgramOverview(true);
  };

  const handleGenerateReport = async () => {
    const metrics = await generateProgramMetrics(selectedAnswers);
    const reportUrl = generateReportUrl(questions, selectedAnswers, metrics);
    window.open(reportUrl, '_blank');
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowProgramOverview(false);
    setShowReportSummary(false);
    setProgramMetrics(null);
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  const handleCloseProgramOverview = () => {
    setShowProgramOverview(false);
  };

  const renderDecisionTree = () => {
    return (
      <div className="decision-tree-container">
        <div className="decision-tree">
          {questions.slice(0, currentQuestionIndex).map((question, index) => (
            <div key={question.id || `decision-${index}`} className="decision-tree-item">
              <span className="question">{question.text}:</span>
              <span className="answer">{selectedAnswers[index]}</span>
            </div>
          ))}
        </div>
        {currentQuestionIndex > 0 && (
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        )}
      </div>
    );
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flow-chart-container">
      <header className="hero-section">
        <h1>Reward Program Flow Chart</h1>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
        </div>
      </header>
      <div className="flow-chart-content">
        <aside className="sidebar">
          {renderDecisionTree()}
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </aside>
        <main className="main-content">
          {questions.map((question, index) => (
            <div 
              key={question.id || `question-${index}`}
              className={`question-answer-section ${index === currentQuestionIndex ? 'current' : index < currentQuestionIndex ? 'previous' : 'hidden'}`}
              ref={el => questionRefs.current[index] = el}
            >
              <div className="question-column">
                <QuestionDisplay question={question} />
              </div>
              <div className="answer-column">
                {question.answers.map((answer: Answer) => (
                  <AnswerCard
                    key={answer.name}
                    answer={answer}
                    isSelected={selectedAnswers[index] === answer.name}
                    isDisabled={index !== currentQuestionIndex}
                    onSelect={() => handleAnswerSelect(index, answer.name)}
                  />
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
      {showProgramOverview && (
        <ProgramOverviewPopup
          questions={questions}
          selectedAnswers={selectedAnswers}
          onGenerateReport={handleGenerateReport}
          onReset={handleReset}
          onClose={handleCloseProgramOverview}
        />
      )}
    </div>
  );
};

export default FlowChart;