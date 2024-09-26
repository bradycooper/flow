import React from "react";
import ReportHeader from "../../molecules/ReportHeader/Index";
import ReportDetails from "../../molecules/ReportDetails/Index";
import { ReportData } from "../../../types";

const ReportPageTemplate: React.FC<{
  report: ReportData | null;
}> = ({ report }) => {
  return (
    <>
      <ReportHeader />
      <ReportDetails report={report} />
    </>
  );
};

export default ReportPageTemplate;
