export const FREE_SHIPPING_FROM = 999;
export const SHIPPING_FEE = 79;

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) => inr.format(amount);

export const getShipping = (subtotal) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;

export const pluralize = (count, word, plural = `${word}s`) =>
  `${count} ${count === 1 ? word : plural}`;
