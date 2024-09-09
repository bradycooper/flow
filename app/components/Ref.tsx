function AIChatHistory() {
  // ... existing code ...

  const handleAnswer = async (answer: string) => {
    // ... existing code ...

    if (currentQuestionIndex === questions.length - 1) {
      // This is the last question
      handleLastQuestionAnswered();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    // ... existing code ...
  };

  // ... rest of the component ...
}