import React from "react";
import SummaryCard from "../SummaryCard/Index";
import { Cn } from "../../../utils/twCn";

const Summaries: React.FC<{
  className?: string | { [key: string]: string };
  summary: string;
  marketingSteps: string[];
}> = ({ className, summary, marketingSteps }) => {
  return (
    <div className={Cn("grid grid-cols-2 gap-8", className)}>
      <SummaryCard heading="Kwik' Summary" description={summary} />
      <SummaryCard
        heading="Marketing Strategy"
        description="A great rewards program requires amazing marketing. No matter how good your rewards and incentives are you have to let people know they exist! Based on your program you configured here are some of our ways you could market this!"
        steps={marketingSteps}
      />
    </div>
  );
};

export default Summaries;
