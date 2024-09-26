import React, { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';

interface ProgressBarProps {
  auctionStartTime: number;
  serverCurrentTime: number;
  totalTime: number;
  isLoading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  auctionStartTime,
  serverCurrentTime,
  totalTime,
  isLoading,
}) => {
  const { formattedTime, progressBarWidth } = useProgress(
    auctionStartTime,
    serverCurrentTime,
    totalTime,
    isLoading,
  );

  const isHalfTime = progressBarWidth <= 50;
  const progressBarColor = isHalfTime ? 'bg-red-500' : 'bg-green-500';

  return (
    <div>
      <div
        className={`text-center text-lg font-bold ${isHalfTime ? 'text-red-500' : 'text-green-500'}`}
      >
        {formattedTime}
      </div>
      <div className="w-full h-1 bg-gray-200">
        <div
          className={`h-full ${progressBarColor}`}
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
