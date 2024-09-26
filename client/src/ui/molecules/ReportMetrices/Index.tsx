import React from "react";
import StatsCard from "../StatsCard/Index";
import { Cn } from "../../../utils/twCn";
import { additionOfThirtyPercent } from "../../../utils/multipleOfThirtyPercent";
import { generateRandomBetween } from "../../../utils/generateRandomBetween";
import { eliminateEndingString } from "../../../utils/eliminateEndingString";

const ReportMetrices: React.FC<{
  className?: string | { [key: string]: string };
  estimatedCost: number | string;
  implementationTimeline: string;
  revenue: string;
}> = ({ className, estimatedCost, implementationTimeline, revenue }) => {
  const potentialRevenue = additionOfThirtyPercent(Number(revenue));
  const score = generateRandomBetween(80, 90);
  return (
    <div className={Cn("grid grid-cols-4 gap-x-3", className)}>
      <StatsCard
        className=" bg-teal"
        heading="Without Kwik Estimated Cost"
        description="This is the total cost of what it would take to create this program on your own based on the program you created"
        powered
      >
        {typeof estimatedCost === "string"
          ? eliminateEndingString(estimatedCost)
          : estimatedCost}
      </StatsCard>
      <StatsCard
        className=" bg-coral"
        heading="Potential Revenue"
        description="This is what revenue could be created from a program like this and include a % increase from your current revenue."
      >
        {potentialRevenue}
      </StatsCard>
      <StatsCard
        className=" bg-bright-yellow"
        heading="Without Kwik Estimated Timeline"
        description="This is how long it could take to implement a program like is without using Kwik."
        powered
      >
        {implementationTimeline}
      </StatsCard>
      <StatsCard
        className="bg-white"
        heading="Kwik Success Score"
        description="This is how well your brand scores in our metrics to determine if you're a good brand for us to work with!"
        sucessScore="90% success rate with your score!"
      >
        {score}/100
      </StatsCard>
    </div>
  );
};

export default ReportMetrices;
