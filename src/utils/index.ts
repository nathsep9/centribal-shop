const IntlNumberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export const numberFormat = (value: number) => IntlNumberFormat.format(value);

export function calculateTax(price: string | number, tax?: string | number) {
  return +price + +(price || 0) * +(tax || 0) * 0.01;
}
