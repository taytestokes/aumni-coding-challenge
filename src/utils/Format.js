/**
 * Formatter to format number values into a US dollar amount
 */
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
