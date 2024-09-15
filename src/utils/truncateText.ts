export const truncateText = (text: string, maxLength = 15) => {
  if (text.length > maxLength) return `${text.slice(0, maxLength)}...`;
  return text;
};
