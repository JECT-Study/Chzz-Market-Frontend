import { useFormatTime } from '@/hooks/useFormatTime';

export function useProgress(
  auctionStartTime: number,
  serverCurrentTime: number,
  totalTime: number,
  isLoading: boolean,
) {
  // 서버 현재 시간과 경매 시작 시간의 차이를 사용해 경과 시간을 계산
  const elapsedTime = serverCurrentTime - auctionStartTime;

  // 경매가 아직 시작되지 않았으면 경매 대기 상태로 표시
  const initialTimeLeft = elapsedTime < 0 ? totalTime : totalTime - elapsedTime;
  const timeLeft = initialTimeLeft > 0 ? initialTimeLeft : 0;

  // progress bar width 계산
  const progressBarWidth = elapsedTime < 0 ? 0 : (timeLeft / totalTime) * 100;

  const formattedTime = useFormatTime(timeLeft);

  return { formattedTime, progressBarWidth, isLoading };
}
