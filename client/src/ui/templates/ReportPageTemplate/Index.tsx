import React from "react";
import ReportHeader from "../../molecules/ReportHeader/Index";
import ReportDetails from "../../molecules/ReportDetails/Index";

const ReportPageTemplate: React.FC<{}> = () => {
  return (
    <>
      <ReportHeader />
      <ReportDetails />
    </>
  );
};

export default ReportPageTemplate;
