// MarketingStrategy.tsx
import React from 'react';

interface MarketingStrategyProps {
  marketingSteps: string[];
}

const MarketingStrategy: React.FC<MarketingStrategyProps> = ({ marketingSteps }) => {
  return (
    <section className="marketing-strategy">
      <h2>Marketing Strategy</h2>
      <ul>
        {marketingSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </section>
  );
};

export default MarketingStrategy;