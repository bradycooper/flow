import React from "react";
import { Question } from "../../../types";
import Title from "../../atoms/Typography/Title/Index";
import Logo from "../../atoms/Logo/Index";
import ProgressIndicator from "../ProgressIndicator/Index";
import Switch from "../../atoms/Swtich/Index";
import ToggleInfluencerMode from "../ToggleInfluencerMode/Index";

const ReportHeader: React.FC<{}> = () => {
  return (
    <div className="pb-10">
      <div className="flex items-center justify-between mb-8">
        <Logo />
        {/* <ToggleInfluencerMode /> */}
      </div>
      <Title className="font-garamond text-center">
        Generated Reward Program Report
      </Title>
    </div>
  );
};

export default ReportHeader;
