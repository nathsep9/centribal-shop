const IntlNumberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export const numberFormat = (value: number) => IntlNumberFormat.format(value);
