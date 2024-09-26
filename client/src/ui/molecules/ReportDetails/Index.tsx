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
import { ReportData, UserInfo } from "../../../types";
import { redirect, useNavigate } from "react-router-dom";
import ReportMetrices from "../ReportMetrices/Index";
import { generateRandomString } from "../../../utils/generateRandomString";

const ReportDetails: React.FC<{
  report: ReportData | null;
}> = ({ report }) => {
  console.log("REPORTS", report);
  const navigate = useNavigate();
  if (!report) {
    // navigate("/");
    return <div>No data found</div>;
  }
  const {
    questions,
    answers,
    userInfo: { revenue },
    aiReport: {
      metrics: { estimatedCost, implementationTimeline, rolesNeeded },
      summary,
      marketingSteps,
      considerations,
      nextSteps,
    },
  } = report;

  console.log({
    userInfo: { revenue },
    aiReport: {
      metrics: { estimatedCost, implementationTimeline },
      summary,
      marketingSteps,
      considerations,
      nextSteps,
    },
  });
  return (
    <div className="grid grid-cols-12 p-4 gap-x-3 gap-y-10">
      <Heading className="col-span-full">Your future company sales</Heading>
      {/* Metrices */}
      <ReportMetrices
        className="col-span-full"
        estimatedCost={estimatedCost}
        implementationTimeline={implementationTimeline}
        revenue={revenue}
      />

      <Heading className="col-span-full">Program Variations</Heading>
      <VariationCard className="col-span-full" />

      <Heading className="col-span-full">Program Details</Heading>
      <ProgramDetails
        className="col-span-full"
        questions={questions}
        answers={answers}
      />
      <Heading className="col-span-full">Summaries</Heading>
      <Summaries
        className="col-span-full"
        summary={summary}
        marketingSteps={marketingSteps}
      />
      <Heading className="col-span-full">Things to Consider</Heading>
      <ThingsToConsider
        className="col-span-full"
        considerations={considerations}
      />
      <Heading className="col-span-full">Next Steps</Heading>
      <NextSteps className="col-span-full" nextSteps={nextSteps} />
      {/* <StatsCard
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
      </StatsCard> */}
      <StatsCard
        className="col-span-full bg-bright-yellow space-y-5 py-10 text-center"
        heading="Employees Needed"
        headingClassName="text-[20px]"
      >
        <ul className="list-disc leading-snug text-[22px] font-[300] flex items-center gap-x-10 gap-y-2 justify-center flex-wrap font-geologica">
          {rolesNeeded.map((role) => (
            <React.Fragment key={generateRandomString()}>
              <li>{role}</li>
            </React.Fragment>
          ))}
        </ul>
      </StatsCard>

      <DoItWithKwik variant="black" className="col-span-full" />
    </div>
  );
};

export default ReportDetails;
