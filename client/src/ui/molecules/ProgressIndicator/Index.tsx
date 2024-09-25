import React from "react";
import ProgressIndicatorBadge from "../../atoms/ProgressIndicatorBadge/Index";
import { Cn } from "../../../utils/twCn";
import { generateRandomString } from "../../../utils/generateRandomString";

const ProgressIndicator: React.FC<{
  progress: number;
  className?: string | { [key: string]: number };
  questions: number;
}> = ({ progress, questions, className }) => {
  return (
    <div className={Cn(className, "flex items-center justify-center mt-5 gap-2")}>
      {Array.from({ length: questions }).map((_, index: number) => (
        <React.Fragment key={generateRandomString()}>
          <ProgressIndicatorBadge
            number={index + 1}
            active={progress >= index + 1}
          />
          <span className="inline-block w-5 h-0.5 bg-black last:hidden"></span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
