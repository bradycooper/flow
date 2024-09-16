// ThingsToConsider.tsx
import React from 'react';

interface ThingsToConsiderProps {
  considerations: string[];
}

const ThingsToConsider: React.FC<ThingsToConsiderProps> = ({ considerations }) => {
  return (
    <section className="things-to-consider">
      <h2>Things to Consider</h2>
      <ul>
        {considerations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default ThingsToConsider;