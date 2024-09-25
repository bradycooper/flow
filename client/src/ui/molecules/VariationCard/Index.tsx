import React from "react";
import Title from "../../atoms/Typography/Title/Index";
import Content from "../../atoms/Typography/Content/Index";
import { Cn } from "../../../utils/twCn";

const VariationCard: React.FC<{
  className?: string | { [key: string]: string };
}> = ({ className }) => {
  return (
    <div
      className={Cn(
        className,
        "p-10 rounded-lg border border-dark-grey flex items-center justify-evenly bg-white min-h-[346px]"
      )}
    >
      <div className="space-y-4">
        <Title className="text-[90px]">8,103,360</Title>
        <Content className="text-[22px] font-[500] capitalize">
          different ways
        </Content>
      </div>
      <div className="h-2/6 w-0.5 bg-light-grey"></div>
      <div className="space-y-2">
        <Content className="font-[400] text-[30px]">
          To create <span className="font-[500]">different</span> programs
          <span className="font-[500]">!</span>
        </Content>
        <Content className="font-[500] italic text-[22px] capitalize">
          his is 1 in 8 million.
        </Content>
      </div>
    </div>
  );
};

export default VariationCard;
