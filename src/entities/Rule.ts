import { Effect } from "./Effect";
import { Fields } from "./Field";

export interface IRule {
  field: Fields;
  operation: string;
  target: number;
  effect: Effect;
}

export class Rule implements IRule {
  field: Fields;
  operation: string;
  target: number;
  effect: Effect;

  constructor(_rule: Rule) {
    this.field = _rule.field;
    this.operation = _rule.operation;
    this.target = _rule.target;
    this.effect = _rule.effect;
  }
}
