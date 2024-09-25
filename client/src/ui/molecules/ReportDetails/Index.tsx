import React from "react";
import Heading from "../../atoms/Typography/Heading/Index";
import StatsCard from "../StatsCard/Index";
import VariationCard from "../VariationCard/Index";
import ProgramDetails from "../ProgramDetails/Index";
import SummaryCard from "../SummaryCard/Index";
import Summaries from "../Summaries/Index";
import ThingsToConsider from "../ThingsToConsider/Index";
import NextSteps from "../NextSteps/Index";
import DoItWithKwik from "../DoItWithKwik/Index";

const ReportDetails: React.FC = () => {
  return (
    <div className="grid grid-cols-12 p-4 gap-x-3 gap-y-10">
      <Heading className="col-span-full">Your future company sales</Heading>
      {/* Stats */}
      <StatsCard
        className="col-span-3 bg-teal"
        heading="Without Kwik Estimated Cost"
        description="This is the total cost of what it would take to create this program on your own based on the program you created"
      >
        $10,000
      </StatsCard>
      <StatsCard
        className="col-span-3 bg-coral"
        heading="Without Kwik Estimated Cost"
        description="This is the total cost of what it would take to create this program on your own based on the program you created"
      >
        $10,000
      </StatsCard>
      <StatsCard
        className="col-span-3 bg-bright-yellow"
        heading="Without Kwik Estimated Cost"
        description="This is the total cost of what it would take to create this program on your own based on the program you created"
      >
        $10,000
      </StatsCard>
      <StatsCard
        className="col-span-3 bg-white"
        heading="Without Kwik Estimated Cost"
        description="This is the total cost of what it would take to create this program on your own based on the program you created"
      >
        $10,000
      </StatsCard>

      <Heading className="col-span-full">Program Variations</Heading>
      <VariationCard className="col-span-full" />

      <Heading className="col-span-full">Program Details</Heading>
      <ProgramDetails className="col-span-full" />
      <Heading className="col-span-full">Summaries</Heading>
      <Summaries className="col-span-full" />
      <Heading className="col-span-full">Things to Consider</Heading>
      <ThingsToConsider className="col-span-full" />
      <Heading className="col-span-full">Next Steps</Heading>
      <NextSteps className="col-span-full" />
      <StatsCard
        className="col-span-4 bg-teal space-y-5 py-10"
        heading="Estimated Time"
        headingClassName="text-[20px]"
        childrenClassName="text-[46px]"
        descriptionClassName="text-[25px] font-[500]"
        description="10 hours a week to maintain"
      >
       300
      </StatsCard>
      <StatsCard
        className="col-span-4 bg-coral space-y-5 py-10"
        heading="Estimated Time"
        headingClassName="text-[20px]"
        childrenClassName="text-[46px]"
        descriptionClassName="text-[25px] font-[500]"
        description="10 hours a week to maintain"
      >
       300
      </StatsCard>
      <StatsCard
        className="col-span-4 bg-bright-yellow space-y-5 py-10"
        heading="Estimated Time"
        headingClassName="text-[20px]"
      >
       <ul className="list-disc leading-snug text-[25px] font-[400]">
        <li>Marketing Desginer</li>
        <li>Reward Strategist</li>
        <li>Store Desginer</li>
       </ul>
      </StatsCard>

      <DoItWithKwik variant="black" className="col-span-full"/>
    </div>
  );
};

export default ReportDetails;
