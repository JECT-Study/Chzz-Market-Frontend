export const truncateText = (text: string, maxLength = 15) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
