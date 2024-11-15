export const formatCurrencyVND = (amount: number): string => {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
