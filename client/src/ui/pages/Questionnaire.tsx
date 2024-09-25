import React, { useState,  } from 'react';
import { Question, UserInfo, ProgramMetrics } from '../../types';
import { generateReportData, generateReportUrl } from '../../utils/reportGenerator';
import { useNavigate } from 'react-router-dom';

interface QuestionnaireProps {
  questions: Question[];
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    companyName: '',
    revenue: '',
  });
  const navigate = useNavigate();

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const metrics: ProgramMetrics = {}; // Define metrics as needed
      const reportData = await generateReportData(answers, metrics, userInfo, questions);
      localStorage.setItem('reportData', JSON.stringify(reportData));
      navigate('/report');
    } catch (error) {
      console.error('Error generating report:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map(question => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          {question.options.map(option => (
            <label key={option.id}>
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={answers[question.id] === option.id}
                onChange={() => handleAnswerChange(question.id, option.id)}
              />
              {option.text}
            </label>
          ))}
        </div>
      ))}
      <div>
        <h3>User Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={userInfo.name}
          onChange={handleUserInfoChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={userInfo.email}
          onChange={handleUserInfoChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={userInfo.companyName}
          onChange={handleUserInfoChange}
          required
        />
        <input
          type="text"
          name="revenue"
          placeholder="Annual Revenue"
          value={userInfo.revenue}
          onChange={handleUserInfoChange}
          required
        />
      </div>
      <button type="submit">Generate Report</button>
    </form>
  );
};

export default Questionnaire;