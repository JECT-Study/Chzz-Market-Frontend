// useProgress.ts
// import { useState, useEffect } from 'react';

// export const useProgress = (auctionStartTime: number, serverCurrentTime: number, totalTime: number) => {
//   const elapsedTime = serverCurrentTime - auctionStartTime;
//   const initialTimeLeft = totalTime - elapsedTime;
//   const [timeLeft, setTimeLeft] = useState(initialTimeLeft > 0 ? initialTimeLeft : 0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = () => {
//     const h = Math.floor(timeLeft / 3600);
//     const m = Math.floor((timeLeft % 3600) / 60);
//     const s = timeLeft % 60;
//     return `${h.toString().padStart(2, '0')}:${m
//       .toString()
//       .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//   };

//   const progressBarWidth = (timeLeft / totalTime) * 100;

//   return { timeLeft, formatTime, progressBarWidth };
// };

import { useState, useEffect } from 'react';

export const useProgress = (
  auctionStartTime: number,
  serverCurrentTime: number,
  totalTime: number,
) => {
  const randomScenario = Math.floor(Math.random() * 3);

  let elapsedTime;
  switch (randomScenario) {
    case 0: // 경매 시작한지 1시간 미만일 경우
      elapsedTime = Math.floor(Math.random() * 3600);
      break;
    case 1: // 경매 시작한지 12시간이 넘었을 경우
      elapsedTime = 12 * 3600 + Math.floor(Math.random() * (12 * 3600));
      break;
    case 2: // 경매 종료까지 2시간 남았을 경우
      elapsedTime =
        totalTime - 2 * 3600 + Math.floor(Math.random() * (2 * 3600));
      break;
    default:
      elapsedTime = 0;
  }

  const adjustedServerCurrentTime = auctionStartTime + elapsedTime;
  const initialTimeLeft =
    totalTime - (adjustedServerCurrentTime - auctionStartTime);
  const [timeLeft, setTimeLeft] = useState(
    initialTimeLeft > 0 ? initialTimeLeft : 0,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 10 : 0)); // 1초에 10초씩 감소
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressBarWidth = (timeLeft / totalTime) * 100;

  return { timeLeft, formatTime, progressBarWidth };
};
