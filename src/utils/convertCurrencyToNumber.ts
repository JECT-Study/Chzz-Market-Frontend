export const convertCurrencyToNumber = (currency: string) =>
  Number(currency.replace(/[^0-9]/g, ''));
