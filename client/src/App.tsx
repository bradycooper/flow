import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlowChart from './pages/FlowChart';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlowChart />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;