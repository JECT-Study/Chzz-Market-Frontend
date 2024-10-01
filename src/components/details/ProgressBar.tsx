import { useState, useEffect } from 'react';

interface ProgressBarProps {
  initialTimeRemaining: number; // Time remaining in seconds from the server
  totalTime: number; // Total auction time in seconds (86,400 seconds)
  isLoading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  initialTimeRemaining,
  totalTime,
  isLoading,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);

  useEffect(() => {
    // Reset timeRemaining when initialTimeRemaining changes
    setTimeRemaining(initialTimeRemaining);

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

  // Calculate progress bar width
  const progressBarWidth = (timeRemaining / totalTime) * 100;

  // Format time as HH:MM:SS
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
