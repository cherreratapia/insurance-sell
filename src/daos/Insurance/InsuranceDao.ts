import { Insurance } from "../../entities";
import { Rule } from "@entities";
import { operations, COMPARATORS } from "../../entities/Operation";

export interface IInsuranceDao {
  insurance: Insurance[];
  get: () => Insurance[];
  add: (insurance: Insurance) => Insurance[];
  simulate: (day: number) => Insurance[][];
}

export class InsuranceDao implements IInsuranceDao {
  insurance: Insurance[];
  constructor() {
    this.insurance = new Array<Insurance>();
  }

  public get(): Insurance[] {
    return this.insurance;
  }

  public add(insurance: Insurance): Insurance[] {
    this.insurance = Object.assign([], this.insurance.concat(insurance));
    return this.insurance;
  }

  public simulate(day: number): Insurance[][] {
    const result: Insurance[][] = new Array<Insurance[]>();
    let copyInsurance = [...this.insurance];
    for (let i = 0; i < day; i++) {
      copyInsurance.map((insurance: Insurance) => {
        if (insurance.rule) {
          insurance.rule.forEach((rule: Rule) => {
            const newPrice = COMPARATORS[rule.operation](
              insurance.sellIn,
              rule.target
            )
              ? operations[rule.effect.operation](
                  insurance.price,
                  rule.effect.operator
                )
              : insurance.price;
            insurance = Object.assign(
              {},
              {
                ...insurance,
                price: newPrice
              }
            );
            if (!result.length) {
              result.push([{ ...insurance }]);
            } else {
              if (!result[i]) {
                result.push([{ ...insurance }]);
              } else {
                result[i].push({ ...insurance });
              }
            }
          });
        }
      });
      copyInsurance = [...result[i]];
    }
    return result;
  }
}
