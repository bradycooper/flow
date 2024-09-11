import React, { useState, useEffect, useRef } from 'react';
import { generateProgramMetrics } from '../utils/metrics';
import { generateReportUrl } from '../utils/reportGenerator';
import '../styles/FlowChart.css';
import { FaRocket, FaUndo, FaTimes } from 'react-icons/fa';

// Define types locally to avoid conflicts
type Question = {
  id: string;
  text: string;
  answers: Answer[];
  questionDescription?: string;
};

type Answer = {
  name: string;
  description: string;
  shortDescription: string;
  longDescription: string;
};

// Update the ProgramMetrics type to match the one from utils/metrics
type ProgramMetrics = {
  estimatedCost: number;
  // Remove projectedEngagement as it's not part of the returned metrics
};

// Add this type definition
type UserInfo = {
  name: string;
  email: string;
  companyUrl: string;
  revenue: string;
  retentionRate: string;
  wholesaleRate: string;
  ltv: string;
  aov: string;
};

// AnswerCard component
const AnswerCard: React.FC<{
  answer: Answer;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}> = ({ answer, isSelected, isDisabled, onSelect }) => (
  <div
    className={`answer-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
    onClick={!isDisabled ? onSelect : undefined}
  >
    <h3>{answer.name}</h3>
    <p className="answer-description">{answer.description}</p>
    <p className="answer-short-description">{answer.shortDescription}</p>
  </div>
);

// DecisionTreeSummary component
const DecisionTreeSummary: React.FC<{
  questions: Question[];
  selectedAnswers: {[key: number]: string};
  onReset: () => void;
}> = ({ questions, selectedAnswers, onReset }) => (
  <div className="decision-tree-summary">
    <h2>Program Configuration</h2>
    <div className="tech-summary">
      {questions.map((question, index) => {
        const selectedAnswerName = selectedAnswers[index];
        if (!selectedAnswerName) return null;
        const selectedAnswer = question.answers.find(a => a.name === selectedAnswerName);
        return (
          <div key={question.id || `decision-${index}`} className="config-item">
            <span className="config-key">{`${index + 1}. ${question.text}`}</span>
            <span className="config-value">{selectedAnswerName}</span>
            {selectedAnswer && (
              <span className="config-description">{selectedAnswer.shortDescription}</span>
            )}
          </div>
        );
      })}
    </div>
    <button onClick={onReset} className="reset-button">Reset Configuration</button>
  </div>
);

// Main FlowChart component
const FlowChart: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showProgramOverview, setShowProgramOverview] = useState(false);
  const [showReportSummary, setShowReportSummary] = useState(false);
  const [programMetrics, setProgramMetrics] = useState<ProgramMetrics | null>(null);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    companyUrl: '',
    revenue: '',
    retentionRate: '',
    wholesaleRate: '',
    ltv: '',
    aov: '',
  });
  const [showUserForm, setShowUserForm] = useState(false);

  const questionDescriptions: { [key: string]: string } = {
    '1': 'Who are you designing your rewards program for? Choose the group of customers or individuals you want to target with your rewards program. Your selection will influence the types of rewards and actions you can incentivize.',
    '2': 'How do customers qualify to participate in your rewards program? Select the criteria that customers must meet in order to join. This could be based on registration, event attendance, or other actions.',
    '3': 'What type of rewards do you want to offer? Choose the incentives that will motivate your customers to participate in the program. This could include discounts, points, exclusive access, or other perks.',
    '4': 'How will customers earn rewards? Define the actions or behaviors that will result in rewards for your customers. This could be purchases, referrals, social media engagement, or other activities.',
    '5': 'How will you structure your reward tiers? Decide on the levels or stages of your rewards program. This could be based on customer loyalty, spending amount, or other criteria.',
    // ... add descriptions for all remaining questions
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    console.log('Questions in state:', questions);
    console.log('First question description in state:', questions[0]?.questionDescription);
  }, [questions]);

  async function fetchQuestions() {
    try {
      const response = await fetch('http://localhost:3005/api/questions');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const updatedData = data.map((question: Question) => ({
        ...question,
        questionDescription: questionDescriptions[question.id as string] || 'No description available'
      }));
      console.log('Updated data:', updatedData);
      setQuestions(updatedData);
      questionRefs.current = updatedData.map(() => null);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  const handleAnswerSelect = async (questionIndex: number, answerName: string): Promise<void> => {
    try {
      const newSelectedAnswers = { ...selectedAnswers, [questionIndex]: answerName };
      setSelectedAnswers(newSelectedAnswers);
      
      const nextQuestionIndex = questionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        const nextQuestion = questionRefs.current[nextQuestionIndex];
        if (nextQuestion) {
          nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Check if all questions are answered
        if (Object.keys(newSelectedAnswers).length === questions.length) {
          setShowProgramOverview(true);
        }
      }
    } catch (error) {
      console.error('Error in handleAnswerSelect:', error);
    }
  };

  const handleGenerateReport = async () => {
    setShowUserForm(true);
    const metrics = await generateProgramMetrics(selectedAnswers);
    const reportUrl = generateReportUrl(questions as any, selectedAnswers, metrics as any);
    window.open(reportUrl, '_blank');
    setShowReportSummary(true);
    
    setProgramMetrics({
      estimatedCost: metrics.estimatedCost,
    });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowProgramOverview(false);
    setShowReportSummary(false);
    setProgramMetrics(null);
    window.scrollTo(0, 0);
  };

  const handleCloseProgramOverview = () => {
    setShowProgramOverview(false);
  };

  const renderDecisionTree = () => {
    const halfLength = Math.ceil(questions.length / 2);
    return (
      <div className="decision-tree-container">
        <div className="decision-tree">
          <h2 className="decision-tree-title">Summary</h2>
          <div className="decision-column">
            {questions.slice(0, halfLength).map((question, index) => (
              <div key={question.id || `decision-${index}`} className="decision-tree-item">
                <span className="question">{question.text}</span>
                <span className="answer">{selectedAnswers[index] || 'Not answered yet'}</span>
              </div>
            ))}
          </div>
          <div className="decision-column">
            {questions.slice(halfLength).map((question, index) => (
              <div key={question.id || `decision-${index + halfLength}`} className="decision-tree-item">
                <span className="question">{question.text}</span>
                <span className="answer">{selectedAnswers[index + halfLength] || 'Not answered yet'}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>
    );
  };

  const progress = (Object.keys(selectedAnswers).length / questions.length) * 100;
  const hasAnsweredQuestions = Object.keys(selectedAnswers).length > 0;

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const renderUserInfoForm = () => (
    <div className="user-info-form">
      <h3>Company Information</h3>
      <input type="text" name="name" placeholder="Name" value={userInfo.name} onChange={handleUserInfoChange} />
      <input type="email" name="email" placeholder="Email" value={userInfo.email} onChange={handleUserInfoChange} />
      <input type="url" name="companyUrl" placeholder="Company URL" value={userInfo.companyUrl} onChange={handleUserInfoChange} />
      <input type="number" name="revenue" placeholder="Revenue ($)" value={userInfo.revenue} onChange={handleUserInfoChange} />
      <input type="number" name="retentionRate" placeholder="Retention Rate (%)" min="0" max="100" step="0.1" value={userInfo.retentionRate} onChange={handleUserInfoChange} />
      <input type="number" name="wholesaleRate" placeholder="Wholesale Rate (%)" min="0" max="100" step="0.1" value={userInfo.wholesaleRate} onChange={handleUserInfoChange} />
      <input type="number" name="ltv" placeholder="LTV ($)" value={userInfo.ltv} onChange={handleUserInfoChange} />
      <input type="number" name="aov" placeholder="AOV ($)" value={userInfo.aov} onChange={handleUserInfoChange} />
    </div>
  );

  const renderProgramOverview = () => {
    return (
      <div className="program-overview-content">
        <h2>Your Program Is Almost Ready!</h2>
        <p>Fill out some more information to get a full report.</p>
        {renderUserInfoForm()}
        <div className="overview-actions">
          <button onClick={handleGenerateReport}><FaRocket /> Generate Report</button>
          <button onClick={handleReset}><FaUndo /> Reset</button>
          <button onClick={() => setShowProgramOverview(false)}><FaTimes /> Close</button>
        </div>
      </div>
    );
  };

  return (
    <div className="flow-chart-container">
      <header className="hero-section">
        <h1>Reward Program Flow Chart</h1>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{`Question ${Object.keys(selectedAnswers).length} of ${questions.length}`}</p>
        </div>
      </header>
      <div className="flow-chart-content">
        {hasAnsweredQuestions && (
          <aside className="summary-sidebar">
            <DecisionTreeSummary
              questions={questions}
              selectedAnswers={selectedAnswers}
              onReset={handleReset}
            />
          </aside>
        )}
        <main className="main-content">
          {questions.map((question, index) => (
            <div 
              key={question.id || `question-${index}`}
              className={`question-answer-section ${index === currentQuestionIndex ? 'current' : index < currentQuestionIndex ? 'previous' : 'hidden'}`}
              ref={el => questionRefs.current[index] = el}
            >
              <div className="question-column">
                <h2 className="question-text">{question.text}</h2>
                {question.questionDescription ? (
                  <p className="question-description">
                    {question.questionDescription}
                  </p>
                ) : (
                  <p className="question-description">
                    No description available (Debug: {JSON.stringify(question)})
                  </p>
                )}
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
        <div className="program-overview-overlay">
          <div className="program-overview-popup">
            {renderProgramOverview()}
          </div>
        </div>
      )}
      {showUserForm && (
        <div className="user-form-overlay">
          <div className="user-form-popup">
            {renderUserInfoForm()}
            <button onClick={() => setShowUserForm(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowChart;