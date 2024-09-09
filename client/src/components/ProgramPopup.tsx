import React from 'react';

interface ProgramPopupProps {
  decisionTree: any; // Replace 'any' with the actual type of your decision tree
  onGenerateReport: () => void;
  onReset: () => void;
}

export function ProgramPopup({ decisionTree, onGenerateReport, onReset }: ProgramPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Your Program Overview</h2>
        <pre className="bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-60">
          {JSON.stringify(decisionTree, null, 2)}
        </pre>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            onClick={onGenerateReport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate My Report
          </button>
        </div>
      </div>
    </div>
  );
}