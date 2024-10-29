import { useEffect, useState } from 'react';

import { useEndAuction } from '@/hooks/useEndAuction';

const totalTime = 24 * 60 ** 2;

interface ProgressBarProps { initialTimeRemaining: number; auctionId: number }

const ProgressBar = ({ initialTimeRemaining, auctionId }: ProgressBarProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTimeRemaining);
  const { endAuction } = useEndAuction()

  useEffect(() => {
    setTimeRemaining(initialTimeRemaining);

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          endAuction(auctionId)
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

  const progressBarColor =
    hours < 1 ? 'bg-timeColor1' : hours <= 16 ? 'bg-timeColor2' : 'bg-timeColor3';
  const textColor =
    hours < 1 ? 'text-timeColor1' : hours <= 16 ? 'text-timeColor2' : 'text-timeColor3';

  return (
    <div className="flex flex-col h-[2.8125rem] w-full">
      <p className={`flex justify-center items-center ${textColor} h-[2.625rem]`}>
        {timeRemaining !== 0 ? formattedTime : '경매 종료'}
      </p>
      <div className="flex-1 bg-gray3">
        <div
          className={`${progressBarColor} h-full transition-width duration-1000`}
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
