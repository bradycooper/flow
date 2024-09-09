import React from 'react';

console.log('AIChatHistory.tsx is being loaded');

interface ChatItem {
  question: string;
  answer?: string;
}

interface AIChatHistoryProps {
  chatHistory: ChatItem[];
}

function AIChatHistory({ chatHistory }: AIChatHistoryProps) {
  console.log('Full chat history:', chatHistory);

  const firstUnansweredIndex = chatHistory.findIndex(item => !item.answer);
  console.log('First unanswered index:', firstUnansweredIndex);

  const currentQuestionIndex = firstUnansweredIndex === -1 ? chatHistory.length - 1 : firstUnansweredIndex;
  console.log('Current question index:', currentQuestionIndex);

  const currentItem = chatHistory[currentQuestionIndex];
  console.log('Current item being rendered:', currentItem);

  console.log('Rendering AIChatHistory component');

  return (
    <div className="flex flex-col space-y-4 p-4">
      {chatHistory.slice(currentQuestionIndex, currentQuestionIndex + 1).map((item, index) => (
        <div key={index}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {currentQuestionIndex + 1}
            </div>
            <div className="font-semibold">{item.question}</div>
          </div>
          {item.answer && (
            <div className="mt-2 pl-10">
              <div className="bg-gray-100 p-2 rounded">{item.answer}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AIChatHistory;