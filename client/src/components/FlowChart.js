import React, { useState, useEffect } from 'react';
import '../styles/FlowChart.css';

const FlowChart = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswer = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flow-chart">
      <h2>{currentQuestion.text}</h2>
      <div className="options">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(currentQuestion.id, option.id)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlowChart;