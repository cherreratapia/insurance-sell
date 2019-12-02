export interface IRule {
  field: string;
  operation: string;
  target: number;
}

export class Rule implements IRule {
  field: string;
  operation: string;
  target: number;

  constructor(_rule: Rule) {
    this.field = _rule.field;
    this.operation = _rule.operation;
    this.target = _rule.target;
  }
}
