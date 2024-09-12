export const formatAmount = (amount: number) => {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN", // Change to Nigerian Naira
    minimumFractionDigits: 2, // Adjust for desired decimal places
  });
};
