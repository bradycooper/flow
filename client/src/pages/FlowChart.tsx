import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateProgramMetrics } from '../utils/metrics';
import { generateReportUrl } from '../utils/reportGenerator';
import '../styles/FlowChart.css';
import { FaRocket, FaUndo, FaTimes } from 'react-icons/fa';
import { Question, Answer, UserInfo, ProgramMetrics } from '../types';

// Remove the declare module statements

interface AnswerCardProps {
  answer: Answer;
  onSelect: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, onSelect }) => {
  return (
    <div className="answer-card" onClick={onSelect}>
      <div className="answer-content">
        <h3 className="answer-title">{answer.name}</h3>
        {answer.description && <p className="answer-description">{answer.description}</p>}
      </div>
    </div>
  );
};

const DecisionTreeSummary: React.FC<{
  questions: Question[];
  selectedAnswers: {[key: string]: string};
  onReset: () => void;
}> = ({ questions, selectedAnswers, onReset }) => {
  const answeredQuestions = questions.filter(question => selectedAnswers[question.id]);

  return (
    <div className="decision-tree-container">
      <h2 className="decision-tree-title">Your Selections</h2>
      {answeredQuestions.map((question) => (
        <div key={question.id} className="decision-tree-item">
          <span className="question">{question.text}</span>
          <span className="answer">
            {question.options.find(option => option.id === selectedAnswers[question.id])?.name}
          </span>
        </div>
      ))}
      {answeredQuestions.length > 0 && (
        <button className="reset-button" onClick={onReset}>
          <FaUndo /> Reset All
        </button>
      )}
    </div>
  );
};

const UserInfoForm: React.FC<{
  onSubmit: (userInfo: UserInfo) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    companyName: '',
    revenue: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <div className="user-info-overlay">
      <div className="user-info-popup">
        <h2>Almost there!</h2>
        <p>Please provide some information to generate your report.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={userInfo.companyName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="revenue"
            placeholder="Annual Revenue"
            value={userInfo.revenue}
            onChange={handleChange}
            required
          />
          <div className="form-actions">
            <button type="submit">Generate Report</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FlowChart: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [visibleQuestions, setVisibleQuestions] = useState<number>(1);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (visibleQuestions > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleQuestions]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
      }
      const data = await response.json();
      console.log('Fetched questions:', data);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Optionally, set some error state here to show an error message to the user
    }
  };

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId });
    if (visibleQuestions < questions.length) {
      setVisibleQuestions(visibleQuestions + 1);
    } else {
      setShowUserInfoForm(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setVisibleQuestions(1);
    setShowUserInfoForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserInfoSubmit = (userInfo: UserInfo) => {
    const metrics = generateProgramMetrics(answers, userInfo);
    const reportUrl = generateReportUrl(answers, metrics, userInfo, questions);
    navigate(reportUrl);
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const isQuizComplete = Object.keys(answers).length === questions.length;

  const handleCompletion = () => {
    // Add any completion logic here, such as showing results or navigating to a new page
    console.log("Quiz completed!");
    // You can add navigation or show a modal here
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flow-chart-container">
      <div className="fixed-header">
        <h1>Program Recommendation Tool</h1>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">{`${Object.keys(answers).length} of ${questions.length}`}</div>
        </div>
      </div>
      <div className="flow-chart-content">
        <div className="summary-sidebar">
          <DecisionTreeSummary
            questions={questions}
            selectedAnswers={answers}
            onReset={handleReset}
          />
        </div>
        <div className="main-content">
          {questions.slice(0, visibleQuestions).map((question, index) => (
            <div
              key={question.id}
              className={`question-answer-section ${answers[question.id] ? 'answered' : ''}`}
            >
              <div className="question-column">
                <h2>{question.text}</h2>
                {question.description && <p>{question.description}</p>}
              </div>
              <div className="answer-column">
                {question.options.map((option: Answer) => (
                  <AnswerCard
                    key={option.id}
                    answer={option}
                    onSelect={() => handleAnswer(question.id, option.id)}
                  />
                ))}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      {showUserInfoForm && (
        <UserInfoForm
          onSubmit={handleUserInfoSubmit}
          onClose={() => setShowUserInfoForm(false)}
        />
      )}
    </div>
  );
};

export default FlowChart;
