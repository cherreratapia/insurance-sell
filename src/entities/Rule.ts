import { Effect } from "./Effect";

export interface IRule {
  field: string;
  operation: string;
  target: number;
  effect: Effect;
}

export class Rule implements IRule {
  field: string;
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
