export const getTimeColor = (timeLeft: number) =>
  timeLeft <= 1
    ? ' text-timeColor1 border-timeColor1'
    : timeLeft <= 16
      ? ' text-timeColor2 border-timeColor2'
      : ' text-timeColor3 border-timeColor3';
