import { Question } from "../../../types";
import { Cn } from "../../../utils/twCn";
import Subtitle from "../../atoms/Typography/Subtitle/Index";
import React, { useEffect, useRef } from "react";
import SelectedItem from "../SelectedItem/Index";
import { generateRandomString } from "../../../utils/generateRandomString";

const DecisionTreeSummary: React.FC<{
  questions: Question[];
  selectedAnswers: { [key: string]: string };
  onReset: () => void;
  className?: string | { [key: string]: string };
}> = ({ questions, selectedAnswers, onReset, className }) => {
  const answeredQuestions = questions.filter(
    (question) => selectedAnswers[question.id]
  );

  const summaryRef = useRef<HTMLDivElement | null>(null);

  // Automatically scroll to the bottom when the number of answered questions changes
  useEffect(() => {
    if (summaryRef.current) {
      summaryRef.current.scrollTop = summaryRef.current.scrollHeight;
    }
  }, [answeredQuestions.length]);

  return (
    <div
      ref={summaryRef} // Reference for scrolling
      className={Cn(
        "bg-light-aqua border border-dark-aqua rounded-lg p-5 flex flex-col gap-6",
        className,
        "sticky top-[175px] h-[600px] overflow-y-auto" // Sticky and scrollable
      )}
    >
      <Subtitle className="font-garamond text-center">Your Selections</Subtitle>
      {answeredQuestions.map(({ id, text, options }) => {
        const answer = options.find(
          (option) => option.id === selectedAnswers[id]
        )?.text;
        return (
          <React.Fragment key={generateRandomString()}>
            <SelectedItem answer={answer} text={text} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DecisionTreeSummary;
