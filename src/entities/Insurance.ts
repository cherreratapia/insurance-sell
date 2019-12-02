import { v4 as uuid } from "uuid";
import { Rule } from "./Rule";
import { Effect } from "./Effect";
export interface IInsurance {
  id?: string;
  name: string;
  sellIn: number;
  price: number;
  rule: Rule[];
  effect: Effect[];
}

export class Insurance implements IInsurance {
  id: string;
  name: string;
  sellIn: number;
  price: number;
  rule: Rule[];
  effect: Effect[];

  constructor(_insurance: Insurance) {
    this.id = uuid();
    this.name = _insurance.name;
    this.sellIn = _insurance.sellIn;
    this.price = _insurance.price;
    this.rule = _insurance.rule;
    this.effect = _insurance.effect;
  }
}
