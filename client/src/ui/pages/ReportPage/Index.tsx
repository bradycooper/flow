import React, { useEffect, useState } from "react";
import ReportPageTemplate from "../../templates/ReportPageTemplate/Index";
import SiteWrapper from "../../molecules/SiteWrapper/Index";
import { ReportData } from "../../../types";

const ReportPage: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("reportData");
    if (storedData) {
      const decodedData: ReportData = JSON.parse(storedData);
      setReportData(decodedData);
    }
  }, []);
  return (
    <main className="bg-grey min-h-screen py-12">
      <SiteWrapper>
        <ReportPageTemplate report={reportData} />
      </SiteWrapper>
    </main>
  );
};

export default ReportPage;
