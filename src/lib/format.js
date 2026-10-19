// Price helpers: server aur client dono me use hote hain
export const formatPrice = (n) =>
  `Rs ${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const discountPercent = (price, oldPrice) =>
  oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;