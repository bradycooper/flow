import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { generateProgramMetrics } from '../utils/metrics';
import { generateReportUrl } from '../utils/reportGenerator';
import '../styles/FlowChart.css';

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

type UserInfo = {
  fullName: string;
  workEmail: string;
  url: string;
  revenue: string;
  aov: string;
  ltv: string;
  companyRetentionRate: string;
  wholesaleRate: string;
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
    <p>{answer.description}</p>
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
    fullName: '',
    workEmail: '',
    url: '',
    revenue: '',
    aov: '',
    ltv: '',
    companyRetentionRate: '',
    wholesaleRate: ''
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
          setShowUserForm(true);
        }
      }
    } catch (error) {
      console.error('Error in handleAnswerSelect:', error);
    }
  };

  const handleGenerateReport = async () => {
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

  const renderDecisionTree = () => {
    return (
      <div className="decision-tree-container">
        <div className="decision-tree">
          <h2 className="decision-tree-title">Summary</h2>
          {questions.map((question, index) => (
            <div 
              key={question.id || `decision-${index}`} 
              className={`decision-tree-item ${selectedAnswers[index] ? 'answered' : ''}`}
            >
              <span className="question">{question.text}</span>
              <span className="answer">{selectedAnswers[index] || 'Not answered yet'}</span>
            </div>
          ))}
        </div>
        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>
    );
  };

  const progress = (Object.keys(selectedAnswers).length / questions.length) * 100;
  const hasAnsweredQuestions = Object.keys(selectedAnswers).length > 0;

  const handleUserInfoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically send the user info and selected answers to your backend
    console.log('User info:', userInfo);
    console.log('Selected answers:', selectedAnswers);
    await handleGenerateReport();
    setShowUserForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format the input values
    if (name === 'revenue' || name === 'aov' || name === 'ltv') {
      // Remove non-digit characters and format as currency
      formattedValue = '$' + value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else if (name === 'companyRetentionRate' || name === 'wholesaleRate') {
      // Remove non-digit characters and add % sign
      formattedValue = value.replace(/\D/g, '') + '%';
    }

    setUserInfo(prev => ({ ...prev, [name]: formattedValue }));
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
            {renderDecisionTree()}
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
            <h2>Program Overview</h2>
            <div className="overview-content">
              {questions.map((question, index) => (
                <div key={question.id || `overview-${index}`} className="overview-item">
                  <h3>{question.text}</h3>
                  <p>{selectedAnswers[index] || 'Not answered'}</p>
                </div>
              ))}
            </div>
            <div className="overview-actions-wrapper">
              <div className="overview-actions">
                <button className="action-button generate" onClick={handleGenerateReport}>Generate Report</button>
                <button className="action-button reset" onClick={handleReset}>Reset</button>
                <button className="action-button close" onClick={() => setShowProgramOverview(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showReportSummary && programMetrics && (
        <div className="report-summary">
          <h2>Report Summary</h2>
          {questions.map((question, index) => (
            <div key={index}>
              <h3>{question.text}</h3>
              <p>{selectedAnswers[index]}</p>
            </div>
          ))}
          <h3>Metrics</h3>
          <p>Estimated Cost: ${programMetrics.estimatedCost}</p>
        </div>
      )}
      {showUserForm && (
        <div className="user-form-overlay">
          <div className="user-form-popup">
            <h2>Almost there!</h2>
            <p>Please provide your information to generate the report.</p>
            <form onSubmit={handleUserInfoSubmit}>
              <input
                type="text"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                name="workEmail"
                value={userInfo.workEmail}
                onChange={handleInputChange}
                placeholder="Work Email"
                required
              />
              <input
                type="url"
                name="url"
                value={userInfo.url}
                onChange={handleInputChange}
                placeholder="URL"
                required
              />
              <input
                type="text"
                name="revenue"
                value={userInfo.revenue}
                onChange={handleInputChange}
                placeholder="Revenue ($)"
                required
              />
              <input
                type="text"
                name="aov"
                value={userInfo.aov}
                onChange={handleInputChange}
                placeholder="AOV - Average Order Value ($)"
                required
              />
              <input
                type="text"
                name="ltv"
                value={userInfo.ltv}
                onChange={handleInputChange}
                placeholder="LTV - Lifetime Value ($)"
                required
              />
              <input
                type="text"
                name="companyRetentionRate"
                value={userInfo.companyRetentionRate}
                onChange={handleInputChange}
                placeholder="Company Retention Rate (%)"
                required
              />
              <input
                type="text"
                name="wholesaleRate"
                value={userInfo.wholesaleRate}
                onChange={handleInputChange}
                placeholder="Wholesale Rate (%)"
                required
              />
              <div className="form-actions">
                <button type="submit" className="submit-button">Generate Report</button>
                <button type="button" className="cancel-button" onClick={() => setShowUserForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowChart;