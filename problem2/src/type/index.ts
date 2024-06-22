export type FieldType = {
  fromCurrency: string;
  fromCurrencyValue: number;
  toCurrency: string;
};
export interface ResponseType {
  currency: string;
  date: string;
  price: number;
}

export interface CurrencyType {
  src: string;
  name: string;
}
