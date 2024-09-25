import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { generateProgramMetrics } from "../../../utils/metrics";
import { generateReportData } from "../../../utils/reportGenerator";
import "./../../../assets/css/FlowChart.css";
import { Question, UserInfo } from "../../../types";
import DecisionTreeSummary from "../../molecules/DecisionTreeSummary/Index";
import Header from "../../molecules/RecommendationHeader/Index";
import AnswerCard from "../../molecules/AnswerCard/Index";
import GenerateReportForm from "../../molecules/GenerateReportForm/Index";
import useFetch from "../../../hooks/useFetch";
import FlowChartPageTemplate from "../../templates/FlowChartPageTemplate/Index";
import SiteWrapper from "../../molecules/SiteWrapper/Index";

const FlowChartPage: React.FC = () => {
  const { data, loading, error } = useFetch<Question[]>("/api/questions");
  return (
    <main>
      <SiteWrapper className="bg-white min-h-screen py-12">
        <FlowChartPageTemplate
          questions={data ?? []}
          loading={loading}
          error={error}
        />
      </SiteWrapper>
    </main>
  );
};

export default FlowChartPage;
