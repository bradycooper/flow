import React from "react";
import { Cn } from "../../../utils/twCn";
import SelectedItem from "../SelectedItem/Index";
import { Question } from "../../../types";
import logo from "./../../../assets/images/kwikAI.png";

const kwikAI = () => {
  return (
    <div className="mt-auto flex flex-col gap-0.5">
      <p className="font-geologica text-[12px]">Powered by</p>
      <img className="w-20" src={logo} alt="OpenAI" />
    </div>
  );
};


const ProgramDetails: React.FC<{
  className?: string | { [key: string]: string };
  questions: Question[];
  answers: { [key: string]: string };
}> = ({ className, questions, answers }) => {
  return (
    <div className={Cn(className,'p-6 rounded-lg bg-light-cream border border-bright-yellow ')}>
      <div className="mt-2">
      <img className="w-20 h-7" src={logo} alt="OpenAI" />
    </div>
    <div
      className="grid grid-cols-3 gap-5 mt-7"
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
    </div>
  );
};

export default ProgramDetails;
