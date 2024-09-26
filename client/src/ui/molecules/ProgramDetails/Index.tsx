import React from "react";
import { Cn } from "../../../utils/twCn";
import SelectedItem from "../SelectedItem/Index";
import { Question } from "../../../types";

const ProgramDetails: React.FC<{
  className?: string | { [key: string]: string };
  questions: Question[];
  answers: { [key: string]: string };
}> = ({ className, questions, answers }) => {
  return (
    <div
      className={Cn(
        className,
        "p-10 rounded-lg bg-light-cream border border-bright-yellow grid grid-cols-3 gap-5"
      )}
    >
      {questions.map(({ id, text, options }) => {
        const answer = options.find(
          (option) => option.id === answers[id]
        )?.text;

        return (
          <SelectedItem
            text={text}
            answer={answer}
            className="border-bright-yellow"
          />
        );
      })}
    </div>
  );
};

export default ProgramDetails;
