import { Insurance, Rule, Effect, IInsurance } from "../../entities";
import { InsuranceDao } from "./InsuranceDao";
import { executeRule, operations } from "../../entities/Operation";

describe("Insurance Data-Access-Object test", () => {
  describe("Get all insurance items", () => {
    it("Should return an empty array of items", () => {
      const insuranceDAO = new InsuranceDao();
      const result: Insurance[] = insuranceDAO.get();
      expect(result).toEqual([]);
    });
  });
  describe("Add a new insurance item to the array", () => {
    it("Should return an array with the item added", () => {
      const insuranceDao = new InsuranceDao();
      const newInsurance = {
        name: "test",
        price: 100,
        sellIn: 10
      };
      const insurance: Insurance = new Insurance(newInsurance);
      const result = insuranceDao.add(insurance);
      expect(result).toEqual([
        {
          name: "test",
          price: 100,
          sellIn: 10,
          rule: []
        }
      ]);
    });
    it("Should return an array with the item added, it should includes one rule and one effect", () => {
      const insuranceDao = new InsuranceDao();
      const effect = new Effect({
        field: "price",
        operation: "-",
        operator: 1
      });
      const rule = new Rule({
        field: "sellIn",
        operation: "daily",
        target: 10,
        effect
      });
      const newInsurance = {
        name: "test",
        price: 100,
        sellIn: 10,
        rule: [rule]
      };
      const insurance: Insurance = new Insurance(newInsurance);
      const result = insuranceDao.add(insurance);
      expect(result).toEqual([
        {
          name: "test",
          price: 100,
          sellIn: 10,
          rule: [
            {
              field: "sellIn",
              operation: "daily",
              target: 10,
              effect: {
                field: "price",
                operation: "-",
                operator: 1
              }
            }
          ]
        }
      ]);
    });
  });
  describe("Check rules of an insurance item and apply effect", () => {
    it("Should return a true from the test of rule", () => {
      const effect = new Effect({
        field: "price",
        operation: "-",
        operator: 1
      });
      const rule = new Rule({
        field: "sellIn",
        operation: "daily",
        target: 10,
        effect
      });
      const newInsurance = {
        name: "test",
        price: 100,
        sellIn: 10,
        rule: [rule]
      };
      const insurance: Insurance = new Insurance(newInsurance);
      let resultExecute: boolean = false;
      if (insurance.rule) {
        resultExecute = executeRule(
          insurance.rule[0],
          insurance.sellIn,
          insurance.rule[0].target
        );
      }
      expect(resultExecute).toBe(true);
    });
    it("Should execute the operation after the test of rule (increment operator)", () => {
      const effect = new Effect({
        field: "price",
        operation: "+",
        operator: 1
      });
      const rule = new Rule({
        field: "sellIn",
        operation: "daily",
        target: 10,
        effect
      });
      const newInsurance = {
        name: "test",
        price: 100,
        sellIn: 10,
        rule: [rule]
      };
      let insurance: Insurance = new Insurance(newInsurance);
      let resultExecute: boolean = false;
      if (insurance.rule) {
        resultExecute = executeRule(
          insurance.rule[0],
          insurance.sellIn,
          insurance.rule[0].target
        );
      }
      expect(resultExecute).toBe(true);
      if (resultExecute) {
        if (insurance.rule) {
          let insuranceCopy: IInsurance = { ...insurance };
          insuranceCopy.price = operations[insurance.rule[0].effect.operation](
            insuranceCopy.price,
            insurance.rule[0].effect.operator
          );
          insurance = new Insurance(insuranceCopy);
        }
      }
      expect(insurance.price).toBe(101);
    });
    it("Should execute the operation after the test of rule (decrement operator)", () => {
      const effect = new Effect({
        field: "price",
        operation: "-",
        operator: 1
      });
      const rule = new Rule({
        field: "sellIn",
        operation: "daily",
        target: 10,
        effect
      });
      const newInsurance = {
        name: "test",
        price: 100,
        sellIn: 10,
        rule: [rule]
      };
      let insurance: Insurance = new Insurance(newInsurance);
      let resultExecute: boolean = false;
      if (insurance.rule) {
        resultExecute = executeRule(
          insurance.rule[0],
          insurance.sellIn,
          insurance.rule[0].target
        );
      }
      expect(resultExecute).toBe(true);
      if (resultExecute) {
        if (insurance.rule) {
          let insuranceCopy: IInsurance = { ...insurance };
          insuranceCopy.price = operations[insurance.rule[0].effect.operation](
            insuranceCopy.price,
            insurance.rule[0].effect.operator
          );
          insurance = new Insurance(insuranceCopy);
        }
      }
      expect(insurance.price).toBe(99);
    });
    it("Should execute the operation after the test of rule (multiply operator)", () => {
      const effect = new Effect({
        field: "price",
        operation: "*",
        operator: 2
      });
      const rule = new Rule({
        field: "sellIn",
        operation: "daily",
        target: 10,
        effect
      });
      const newInsurance = {
        name: "test",
        price: 100,
        sellIn: 10,
        rule: [rule]
      };
      let insurance: Insurance = new Insurance(newInsurance);
      let resultExecute: boolean = false;
      if (insurance.rule) {
        resultExecute = executeRule(
          insurance.rule[0],
          insurance.sellIn,
          insurance.rule[0].target
        );
      }
      expect(resultExecute).toBe(true);
      if (resultExecute) {
        if (insurance.rule) {
          let insuranceCopy: IInsurance = { ...insurance };
          insuranceCopy.price = operations[insurance.rule[0].effect.operation](
            insuranceCopy.price,
            insurance.rule[0].effect.operator
          );
          insurance = new Insurance(insuranceCopy);
        }
      }
      expect(insurance.price).toBe(200);
    });
    it("Should execute the operation after the test of rule (divider operator)", () => {
      const effect = new Effect({
        field: "price",
        operation: "/",
        operator: 2
      });
      const rule = new Rule({
        field: "sellIn",
        operation: "daily",
        target: 10,
        effect
      });
      const newInsurance = {
        name: "test",
        price: 100,
        sellIn: 10,
        rule: [rule]
      };
      let insurance: Insurance = new Insurance(newInsurance);
      let resultExecute: boolean = false;
      if (insurance.rule) {
        resultExecute = executeRule(
          insurance.rule[0],
          insurance.sellIn,
          insurance.rule[0].target
        );
      }
      expect(resultExecute).toBe(true);
      if (resultExecute) {
        if (insurance.rule) {
          let insuranceCopy: IInsurance = { ...insurance };
          insuranceCopy.price = operations[insurance.rule[0].effect.operation](
            insuranceCopy.price,
            insurance.rule[0].effect.operator
          );
          insurance = new Insurance(insuranceCopy);
        }
      }
      expect(insurance.price).toBe(50);
    });
  });
  describe("Simulate the effects of rules by two days", () => {
    it("Should return a list of the insurance and the changes by days with decrement operator", () => {
      const insuranceDao = new InsuranceDao();
      insuranceDao.add(
        new Insurance({
          name: "test",
          price: 100,
          sellIn: 10,
          rule: [
            {
              field: "sellIn",
              operation: "daily",
              target: 10,
              effect: { field: "price", operation: "-", operator: 1 }
            }
          ]
        })
      );
      const insuranceList = insuranceDao.add(
        new Insurance({
          name: "Seguro 2",
          price: 10,
          sellIn: 10,
          rule: [
            {
              field: "sellIn",
              operation: "daily",
              target: 10,
              effect: { field: "price", operation: "-", operator: 1 }
            }
          ]
        })
      );
      const result = insuranceDao.simulate(2);
      expect(insuranceList[0].rule).toBeDefined();
      expect(insuranceList[1].rule).toBeDefined();
      expect(result.length).toEqual(2);
      expect(result).toEqual([
        [
          {
            name: "test",
            price: 99,
            sellIn: 10,
            rule: [
              {
                field: "sellIn",
                operation: "daily",
                target: 10,
                effect: { field: "price", operation: "-", operator: 1 }
              }
            ]
          },
          {
            name: "Seguro 2",
            price: 9,
            sellIn: 10,
            rule: [
              {
                field: "sellIn",
                operation: "daily",
                target: 10,
                effect: { field: "price", operation: "-", operator: 1 }
              }
            ]
          }
        ],
        [
          {
            name: "test",
            price: 98,
            sellIn: 10,
            rule: [
              {
                field: "sellIn",
                operation: "daily",
                target: 10,
                effect: { field: "price", operation: "-", operator: 1 }
              }
            ]
          },
          {
            name: "Seguro 2",
            price: 8,
            sellIn: 10,
            rule: [
              {
                field: "sellIn",
                operation: "daily",
                target: 10,
                effect: { field: "price", operation: "-", operator: 1 }
              }
            ]
          }
        ]
      ]);
    });
    it("Should return a list of the insurance with no changes", () => {
      const insuranceDao = new InsuranceDao();
      const insuranceList = insuranceDao.add(
        new Insurance({
          name: "Seguro 2",
          price: 10,
          sellIn: 10,
          rule: []
        })
      );
      expect(insuranceList[0].rule).toEqual([]);
      const result = insuranceDao.simulate(2);
      expect(result.length).toEqual(2);
      expect(result).toEqual([
        [
          {
            name: "Seguro 2",
            price: 10,
            sellIn: 10,
            rule: []
          }
        ],
        [
          {
            name: "Seguro 2",
            price: 10,
            sellIn: 10,
            rule: []
          }
        ]
      ]);
    });
  });
});
