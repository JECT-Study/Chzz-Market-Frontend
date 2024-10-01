/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

interface ProgressBarProps {
  initialTimeRemaining: number | '';
  totalTime: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  initialTimeRemaining,
  totalTime,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(
    typeof initialTimeRemaining === 'number' ? initialTimeRemaining : 0
  );

  useEffect(() => {
    setTimeRemaining(
      typeof initialTimeRemaining === 'number' ? initialTimeRemaining : 0
    );

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTimeRemaining]);

  const progressBarWidth = (timeRemaining / totalTime) * 100;

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isHalfTime = progressBarWidth <= 50;
  const progressBarColor = isHalfTime ? 'bg-red-500' : 'bg-green-500';

  return (
    <div>
      <div
        className={`text-center text-lg font-bold ${
          isHalfTime ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {formattedTime}
      </div>
      <div className='w-full h-1 bg-gray-200'>
        <div
          className={`h-full ${progressBarColor}`}
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
