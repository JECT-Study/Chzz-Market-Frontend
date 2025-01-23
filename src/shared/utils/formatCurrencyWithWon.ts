export const formatCurrencyWithWon = (amount: number | undefined) =>
  typeof amount === 'number' ? `${amount.toLocaleString('en-US')} 원` : '1000 원';