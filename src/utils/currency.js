export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)' },
  JPY: { symbol: '¥', rate: 155.0, label: 'JPY (¥)' }
};

export const formatPrice = (amountInUSD, currency = 'USD') => {
  const safeAmount = typeof amountInUSD === 'number' && !Number.isNaN(amountInUSD) ? amountInUSD : 0;
  const curr = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = safeAmount * curr.rate;

  if (currency === 'JPY') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${curr.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
