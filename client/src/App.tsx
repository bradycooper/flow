import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlowChartPage from "./ui/pages/FlowChartPage/Index";
import ReportPage from "./ui/pages/ReportPage/Index";

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<FlowChartPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </Router>
  );
};

export default App;
