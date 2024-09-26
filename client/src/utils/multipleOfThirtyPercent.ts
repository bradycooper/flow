export const multipleOfThirtyPercent = (amount: number): string => {
  const result = amount * 0.3 * amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(result);
};
