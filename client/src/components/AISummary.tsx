// AISummary.tsx
import React from 'react';

interface AISummaryProps {
  summary: string;
}

const AISummary: React.FC<AISummaryProps> = ({ summary }) => {
  return (
    <section className="ai-summary">
      <h2>'Kwik' Summary</h2>
      <p>{summary}</p>
    </section>
  );
};

export default AISummary;