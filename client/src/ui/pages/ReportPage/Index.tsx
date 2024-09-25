import React from "react";
import ReportPageTemplate from "../../templates/ReportPageTemplate/Index";
import SiteWrapper from "../../molecules/SiteWrapper/Index";

const ReportPage: React.FC = () => {
  return (
    <main className="bg-grey min-h-screen py-12">
      <SiteWrapper>
        <ReportPageTemplate />
      </SiteWrapper>
    </main>
  );
};

export default ReportPage;
