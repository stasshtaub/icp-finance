export const formatCurrency = (value: any, currency = "RUB"): string => {    
  const formatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency });
  return formatter.format(value);
}
