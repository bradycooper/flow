import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlowChart from './pages/FlowChart';
import Report from './pages/Report';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlowChart />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;