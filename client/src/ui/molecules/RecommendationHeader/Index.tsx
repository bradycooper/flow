import React from "react";
import { Question } from "../../../types";
import Title from "../../atoms/Typography/Title/Index";
import Logo from "../../atoms/Logo/Index";
import ProgressIndicator from "../ProgressIndicator/Index";
import { Cn } from "../../../utils/twCn";

const RecommendationHeader: React.FC<{
  questions: number;
  className?: string | { [key: string]: string };
  progress: number;
}> = ({ questions, progress, className }) => {
  return (
    <div className={Cn("pb-6", className)}>
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
