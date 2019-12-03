import { Rule } from "./Rule";

type stringAsKeyOptions = {
  [key: string]: any;
};

export const operations: stringAsKeyOptions = {
  "+": (origin: number, target: number) => origin + target,
  "-": (origin: number, target: number) => origin - target,
  "*": (origin: number, target: number) => origin * target,
  "/": (origin: number, target: number) => origin / target
};

export const COMPARATORS: stringAsKeyOptions = {
  daily: (origin: number, target: number) => true
};

export const executeRule = (rule: Rule, origin: number, target: number) =>
  COMPARATORS[rule.operation](origin, target);
