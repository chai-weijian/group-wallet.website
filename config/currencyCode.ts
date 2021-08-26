export const CURRENCY_CODE_LIST = ["SGD", "MYR"] as const;
export type CurrencyCode = typeof CURRENCY_CODE_LIST[number];
