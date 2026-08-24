export function formatCurrency(
  amount: number,
  currencyIso: string,
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyIso,
  }).format(amount);
}
