import { Rule } from "./Rule";
interface StringMap {
  [key: string]: any;
}
export interface IInsurance extends StringMap {
  name: string;
  sellIn: number;
  price: number;
  rule?: Rule[];
}

export class Insurance implements IInsurance {
  name: string;
  sellIn: number;
  price: number;
  rule?: Rule[];

  constructor(_insurance: Insurance) {
    this.name = _insurance.name;
    this.sellIn = _insurance.sellIn;
    this.price = _insurance.price;
    this.rule = [];
    if (_insurance.rule) {
      this.rule = _insurance.rule;
    }
  }
}
