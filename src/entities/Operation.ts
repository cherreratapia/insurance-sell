import { Rule } from "./Rule";

type stringAsKeyOptions = {
  [key: string]: any;
};

export const operations: stringAsKeyOptions = {
  "+": (origin: number, target: number) => origin + target,
  "-": (origin: number, target: number) => origin - target,
  "*": (origin: number, target: number) => origin * target,
  "/": (origin: number, target: number) => origin / target,
  "=": (origin: number, target: number) => (origin = target)
};

export const COMPARATORS: stringAsKeyOptions = {
  daily: (origin: number, target: number) => true,
  lessThan: (origin: number, target: number) => origin < target,
  lessThanOrEqual: (origin: number, target: number) => origin <= target,
  equal: (origin: number, target: number) => origin === target,
  greaterThan: (origin: number, target: number) => origin > target,
  greaterThanOrEqual: (origin: number, target: number) => origin >= target
};

export const executeRule = (rule: Rule, origin: number, target: number) =>
  COMPARATORS[rule.operation](origin, target);
