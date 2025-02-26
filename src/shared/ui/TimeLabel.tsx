import { getTimeColor } from '../utils/getTimeColor';

export const TimeLabel = ({ time }: { time: number }) => {
  let formattedTime = time / 3600;
  const color = getTimeColor(Math.ceil(time / 3600));

  let remainingTime;
  if (formattedTime >= 1)
    remainingTime = `${Math.ceil(formattedTime)}시간 남음`;
  else {
    formattedTime *= 60;
    if (formattedTime >= 1)
      remainingTime = `${Math.ceil(formattedTime)}분 남음`;
    else {
      formattedTime *= 60;
      if (formattedTime >= 1) remainingTime = '1분 미만';
      else remainingTime = '경매 종료';
    }
  }

  return (
    <div
      aria-label="시간"
      className={`absolute bottom-0 w-full pt-1 text-center bg-white opacity-80 ${color} border-b-2 text-body1`}
    >
      <p className={`${remainingTime === '경매 종료' && 'text-redNotice'}`}>
        {remainingTime}
      </p>
    </div>
  );
};
