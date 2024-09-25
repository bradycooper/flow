import React from "react";
import { Question } from "../../../types";
import Title from "../../atoms/Typography/Title/Index";
import Logo from "../../atoms/Logo/Index";
import ProgressIndicator from "../ProgressIndicator/Index";

const RecommendationHeader: React.FC<{
  questions: number;
  // answers: { [key: string]: string };
  progress: number;
}> = ({ questions, progress }) => {
  console.log({ progress, questions });
  return (
    <div className="pb-10">
      <Logo className="mb-8" />
      <Title className="font-garamond text-center">
        Program Recommendation Tool
      </Title>
      <ProgressIndicator
        progress={progress}
        questions={questions}
        className="mx-auto"
      />
    </div>
  );
};

export default RecommendationHeader;
