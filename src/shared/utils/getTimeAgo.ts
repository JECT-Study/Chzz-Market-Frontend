export const getTimeAgo = (time: string) => {
  const diff = new Date().getTime() - new Date(time).getTime();

  const secondDiff = Math.floor(diff / 1000);
  if (secondDiff < 60) return `${secondDiff}초 전`;

  const minDiff = Math.floor(diff / (1000 * 60));
  if (minDiff < 60) return `${minDiff}분 전`;

  const hourDiff = Math.floor(diff / (1000 * 60 * 60));
  if (hourDiff < 24) return `${hourDiff}시간 전`;

  const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (dayDiff < 30) return `${dayDiff}일 전`;

  const monthDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  if (monthDiff < 12) return `${monthDiff}달 전`;

  const yearDiff = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));
  return `${yearDiff}년 전`;
};
