// Helper function để format tiền tệ VND
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '0₫';

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Helper function để format số với dấu phẩy
export const formatNumber = (number) => {
  if (!number && number !== 0) return '0';

  return new Intl.NumberFormat('vi-VN').format(number);
}; 