// NextSteps.tsx
import React from 'react';

interface NextStepsProps {
  metrics: {
    setupTime: string;
    maintenanceTime: string;
    estimatedCost: number;
    rolesNeeded: string[];
  };
}

const NextSteps: React.FC<NextStepsProps> = ({ metrics }) => {
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
    "Continue to push by integrating with your marketing calendar",
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
            <p>{metrics.setupTime} setup</p>
            <p>{metrics.maintenanceTime} to maintain</p>
          </div>
          <div className="info-box">
            <h3>Estimated Cost</h3>
            <p>${metrics.estimatedCost.toLocaleString()}</p>
          </div>
          <div className="info-box">
            <h3>Roles Needed</h3>
            <ul>
              {metrics.rolesNeeded.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextSteps;