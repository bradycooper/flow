import React from 'react';
import { ReportData } from '../types';

interface AISummaryProps {
  programData: ReportData;
}

export const AISummary: React.FC<AISummaryProps> = ({ programData }) => {
  // In the future, you can replace this with a call to your custom GPT
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