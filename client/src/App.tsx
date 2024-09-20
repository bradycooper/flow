import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlowChart from './pages/FlowChart';
import Report from './pages/Report';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlowChart />} />
        <Route path="/report" element={<Report />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;