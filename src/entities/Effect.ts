import { Fields } from "./Field";

export interface IEffect {
  field: Fields;
  operation: string;
  operator: number;
}

export class Effect implements IEffect {
  field: Fields;
  operation: string;
  operator: number;

  constructor(_effect: Effect) {
    this.field = _effect.field;
    this.operation = _effect.operation;
    this.operator = _effect.operator;
  }
}
