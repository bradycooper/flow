import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question, UserInfo } from "../../../types";
import { generateProgramMetrics } from "../../../utils/metrics";
import { generateReportData } from "../../../utils/reportGenerator";
import DecisionTreeSummary from "../../molecules/DecisionTreeSummary/Index";
import AnswerCard from "../../molecules/AnswerCard/Index";
import GenerateReportForm from "../../molecules/GenerateReportForm/Index";
import RecommendationHeader from "../../molecules/RecommendationHeader/Index";
import { generateRandomString } from "../../../utils/generateRandomString";
import Subtitle from "../../atoms/Typography/Subtitle/Index";
import { Cn } from "../../../utils/twCn";
import useScrollToView from "../../../hooks/useScrollToView";

const FlowChartPageTemplate: React.FC<{
  questions: Question[] | [];
  loading: boolean;
  error: boolean | unknown;
}> = ({ questions, loading, error }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [visibleQuestions, setVisibleQuestions] = useState<number>(1);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const navigate = useNavigate();
  const { ref } = useScrollToView([visibleQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      setVisibleQuestions(1);
    }
  }, [questions]);

  useEffect(() => {
    document.body.style.overflowY = showUserInfoForm ? "hidden" : "scroll";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [showUserInfoForm]);

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId });
    if (answers[questionId]) return;
    if (visibleQuestions < questions.length) {
      setVisibleQuestions(visibleQuestions + 1);
    } else {
      setShowUserInfoForm(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setVisibleQuestions(1);
    setShowUserInfoForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClose = () => {
    setShowUserInfoForm(false);
  };

  const handleUserInfoSubmit = async (userInfo: UserInfo) => {
    setLoadingResponse(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const metrics = generateProgramMetrics(answers, userInfo);
    try {
      const reportData = await generateReportData(
        answers,
        metrics,
        userInfo,
        questions
      );
      if (reportData) {
        localStorage.setItem("reportData", JSON.stringify(reportData));
        setLoadingResponse(false);
        navigate("/report");
      }
    } catch (error) {
      setLoadingResponse(false);
      console.error("Error generating report:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RecommendationHeader
        // answers={answers}
        progress={Object.keys(answers).length}
        questions={questions.length}
        className="col-span-full sticky -top-16 bg-white z-20"
      />
      <DecisionTreeSummary
        questions={questions}
        selectedAnswers={answers}
        onReset={handleReset}
        className="col-span-4"
      />
      <div className="col-start-5 col-span-full flex flex-col gap-7">
        {questions.slice(0, visibleQuestions).map((question) => {
          return (
            <div
              key={generateRandomString()}
              className={Cn("border border-light-grey p-6 rounded-lg")}
            >
              <Subtitle className="font-garamond font-[500] mb-6">
                {question.text}
              </Subtitle>
              <div className="flex flex-col gap-4">
                {question.options &&
                  question.options.map((option) => {
                    const active = question.options.find(
                      (option) => option.id === answers[question.id]
                    );
                    return (
                      <React.Fragment key={generateRandomString()}>
                        <AnswerCard
                          answer={option}
                          onSelect={() => handleAnswer(question.id, option.id)}
                          active={option.id === active?.id}
                        />
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          );
        })}
        <div ref={ref} className="h-0" />
      </div>
      {showUserInfoForm && (
        <GenerateReportForm
          handleSubmit={handleUserInfoSubmit}
          loading={loadingResponse}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default FlowChartPageTemplate;
