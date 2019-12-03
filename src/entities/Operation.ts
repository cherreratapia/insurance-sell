import { Rule } from "./Rule";
import { Insurance } from "./Insurance";

type comparatorOptions = {
  [key: string]: any;
};

export const COMPARATORS: comparatorOptions = {
  daily: (origin: number, target: number) => true
};

export const executeRule = (insurance: Insurance) => {
  if (insurance.rule) {
    insurance.rule.map((item: Rule) => {
      return COMPARATORS[item.operation](insurance.sellIn, item.target);
    });
  }
};
