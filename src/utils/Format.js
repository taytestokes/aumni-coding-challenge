/**
 * Formatter to format number values into a US dollar amount
 */
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * Formats date strings
 */
export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * Formats a decimal value to a percentage
 */
export const formatPercentage = (decimalVal) =>
  `${Math.round(decimalVal * 100)}%`;
