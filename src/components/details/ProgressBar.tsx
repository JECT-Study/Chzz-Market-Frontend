import React from 'react';

interface ProgressBarProps {
  progressBarWidth: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressBarWidth }) => {
  return (
    <div className="w-full h-1 bg-gray-200">
      <div
        className="h-full bg-green-500"
        style={{ width: `${progressBarWidth}%` }}
      />
    </div>
  );
};

export default ProgressBar;
