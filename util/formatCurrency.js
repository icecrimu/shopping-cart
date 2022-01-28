const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD"
})

export function formatCurrency(amount) {
  return formatter.format(amount)
}
