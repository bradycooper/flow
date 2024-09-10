import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProgramMetrics } from '../types';
import '../styles/Report.css';
import '../styles/FlowChart.css';

interface ReportData {
  decisions: { question: string; answer: string }[];
  metrics: ProgramMetrics;
}

interface MetricsAnalysisProps {
  withoutKwikCost: number;
  potentialRevenue: { revenue: number; percentageIncrease: number };
  withoutKwikTimeline: string;
  kwikSuccessScore: { score: number; successRate: number };
}

const MetricsAnalysis: React.FC<MetricsAnalysisProps> = ({
  withoutKwikCost,
  potentialRevenue,
  withoutKwikTimeline,
  kwikSuccessScore,
}) => {
  return (
    <div className="metrics-analysis">
      <h2>Metrics Analysis</h2>
      <div className="metrics-grid">
        <div className="metric-box">
          <h3>Without Kwik Estimated Cost</h3>
          <p>${withoutKwikCost.toLocaleString()}</p>
          <p>This is the total cost of what it would take to create this program on your own based on the program you created.</p>
        </div>
        <div className="metric-box">
          <h3>Potential Revenue</h3>
          <p>${potentialRevenue.revenue.toLocaleString()} (+{potentialRevenue.percentageIncrease}%)</p>
          <p>This is what revenue could be created from a program like this and include a % increase from your current revenue.</p>
        </div>
        <div className="metric-box">
          <h3>Without Kwik Estimated Timeline</h3>
          <p>{withoutKwikTimeline}</p>
          <p>This is how long it could take to implement a program like this without using Kwik.</p>
        </div>
        <div className="metric-box">
          <h3>Kwik Success Score</h3>
          <p>{kwikSuccessScore.score}/100</p>
          <p>{kwikSuccessScore.successRate}% success rate with your score!</p>
          <p>This is how well your brand scores in our metrics to determine if you're a good brand for us to work with!</p>
        </div>
      </div>
    </div>
  );
};

const AISummary: React.FC<{ programData: ReportData }> = ({ programData }) => {
  const generateAISummary = (data: ReportData): string => {
    return `Your program looks amazing! Creating a customer retention program targeted at engaging your old customers, by making a program available to all of them and incentivizing them utilizing a giveaway is going to crush it! Looks like you want to incentivize purchasing and this will definitely do it. Giving them points is a smart way to do it and keeps them aware of what they're earning and making them earn those based on purchasing is a genius way to actually drive the behavior that you want. That's why making it a fixed % is the smartest way to easily calculate those results!

We have a few things to note on this program.`;
  };

  return (
    <section className="ai-summary">
      <h2>'Kwik' Summary</h2>
      <p>{generateAISummary(programData)}</p>
    </section>
  );
};

const MarketingStrategy: React.FC<{ programData: ReportData }> = ({ programData }) => {
  const generateMarketingStrategy = (data: ReportData): string => {
    return `A great rewards program requires amazing marketing. No matter how good your rewards and incentives are you have to let people know they exist! Based on your program you configured here are some of our ways you could market this!

1. Pop Up: Reward pop ups do a great job at letting visitors to your site know you have a program. This also allows you to capture emails at roughly 3x a higher rate.

2. Product Pages: Put the reward points that users get right on the page! So that they can see as they're shopping what they get.

3. In the checkout! Let them know as they checkout what they're earning on their purchase so by the time they purchase they're aware of the offer.

4. Post purchase Claim: Give them an easy way to claim those points right at the point of checkout.

5. Post purchase email: Send them an email after telling them to claim those points.

These are a few of the things to watch for, but also integrate as you run promotions and seasonal offers. The more you push this program, the more results you're going to see.`;
  };

  return (
    <section className="marketing-strategy">
      <h2>Marketing Strategy</h2>
      <p>{generateMarketingStrategy(programData)}</p>
    </section>
  );
};

const ThingsToConsider: React.FC<{ programData: ReportData }> = ({ programData }) => {
  const generateThingsToConsider = (data: ReportData): string[] => {
    return [
      "How you're going to give points",
      "Are you going to give points in more actions?",
      "How are you going to handle half points?",
      "Can they redeem for free product, or up to a certain amount?",
      "How much is this going to cost me over multiple orders?",
      "Is there a way I can reduce liability of those points by giving different type of rewards?",
      "Are orders used on the first purchase or just the second?",
      "When do points expire?",
      "How can I create promotions around expiration to enhance the program?",
      "How can get people opting into the point system?",
      "How can I use points to get customer referrals and how can I budget for that?",
      "What kind of software should I use to automate this?",
      "Who am I going to employ to manage this program?",
      "Who is going to develop the software or setup the software to do this?",
      "How will we integrate with our processing system to automate this?",
      "What is the best way to market to customers?",
      "Are points even the best incentive?"
    ];
  };

  return (
    <section className="things-to-consider">
      <h2>Things to Consider</h2>
      <ul>
        {generateThingsToConsider(programData).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

const NextSteps: React.FC<{ programData: ReportData }> = ({ programData }) => {
  const steps = [
    "Create a program",
    "Create a budget for the program",
    "Find the right software or create your own software",
    "Figure out the profit margins with the program in place",
    "Design the customer journey integrated with the rewards program",
    "Create the marketing assets for the program",
    "Develop the marketing assets for the program",
    "Implement the program",
    "Audit the rewards",
    "Launch the program",
    "Promote the program",
    "Monitor the results",
    "A/B test till you find what works",
    "Continue to push by integrating with your marketing calendar"
  ];

  return (
    <section className="next-steps">
      <h2>Next Steps</h2>
      <div className="next-steps-content">
        <div className="steps-list">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <input type="checkbox" id={`step-${index}`} />
              <label htmlFor={`step-${index}`}>{step}</label>
            </div>
          ))}
        </div>
        <div className="steps-info">
          <div className="info-box">
            <h3>Estimated Time</h3>
            <p>300 Hours setup</p>
            <p>10 hours a week to maintain</p>
          </div>
          <div className="info-box">
            <h3>Estimated Cost</h3>
            <p>$303k</p>
          </div>
          <div className="info-box">
            <h3>Roles Needed</h3>
            <ul>
              <li>Marketing Designer</li>
              <li>Reward Strategist</li>
              <li>Store Developer</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const DoItWithKwik: React.FC<{ programData: ReportData }> = ({ programData }) => {
  const generateKwikBenefits = (data: ReportData): string => {
    return `We track user points, setup the attribution, the earning, the redemption, the redemption methods, we create a program for you, a forecast for you, a budget for you, and everything you need to make the program work without having to create a dedicated team for this project. 
Yet yielding you over $${data.metrics.potentialRevenue.toLocaleString()} in revenue for a fraction of the cost to do it on your own.`;
  };

  return (
    <section className="do-it-with-kwik">
      <h2>Do it with Kwik</h2>
      <p>It might sound like a lot of work! But our team loves this stuff! We have spent 40 years doing rewards and incentive programs and have generated over $6 BILLION in sales through our programs and we can handle all of this for you.</p>
      <p>Our software automates everything you need for this program to happen.</p>
      <p>{generateKwikBenefits(programData)}</p>
      <a href="https://calendly.com/kwikteam/kwik-software-exploration-clone?back=1&month=2024-09" className="cta-button">Book a Call</a>
    </section>
  );
};

const Report: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const encodedData = searchParams.get('data');
    if (encodedData) {
      try {
        const decodedData: ReportData = JSON.parse(decodeURIComponent(encodedData));
        console.log('Decoded data:', decodedData);
        setReportData(decodedData);
      } catch (error) {
        console.error('Error parsing report data:', error);
      }
    }
  }, [location]);

  if (!reportData) {
    return <div className="loading">Loading report...</div>;
  }

  return (
    <div className="report-container">
      <header className="report-header">
        <h1>AI-Generated Reward Program Report</h1>
      </header>
      <main className="report-content">
        <MetricsAnalysis
          withoutKwikCost={calculateWithoutKwikCost(reportData)}
          potentialRevenue={calculatePotentialRevenue(reportData)}
          withoutKwikTimeline={calculateWithoutKwikTimeline(reportData)}
          kwikSuccessScore={calculateKwikSuccessScore(reportData)}
        />
        
        <section className="program-details">
          <h2>Program Details</h2>
          <div className="details-grid">
            {reportData.decisions.map((decision, index) => (
              <div key={index} className="detail-item">
                <h3>{decision.question}</h3>
                <p>{decision.answer}</p>
              </div>
            ))}
          </div>
        </section>
        
        <AISummary programData={reportData} />
        
        <MarketingStrategy programData={reportData} />
        
        <ThingsToConsider programData={reportData} />
        
        <NextSteps programData={reportData} />
        
        <DoItWithKwik programData={reportData} />
      </main>
    </div>
  );
};

// Helper functions (these should be implemented with actual logic)
const calculateWithoutKwikCost = (data: ReportData) => {
  // Implement logic to calculate the cost without Kwik
  return 10000; // Placeholder
};

const calculatePotentialRevenue = (data: ReportData) => {
  // Implement logic to calculate potential revenue and percentage increase
  return { revenue: 50000, percentageIncrease: 25 }; // Placeholder
};

const calculateWithoutKwikTimeline = (data: ReportData) => {
  // Implement logic to calculate the timeline without Kwik
  return '6 months'; // Placeholder
};

const calculateKwikSuccessScore = (data: ReportData) => {
  // Implement logic to calculate the Kwik Success Score
  return { score: 85, successRate: 90 }; // Placeholder
};

export default Report;