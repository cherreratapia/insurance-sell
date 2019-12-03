import { Insurance, Rule, Effect } from "../../entities";
import { InsuranceDao } from "./InsuranceDao";

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
          rule: [],
          effect: []
        }
      ]);
    });
    it("Should return an array with the item added, it should includes one rule and one effect", () => {
      const insuranceDao = new InsuranceDao();
      const rule = new Rule({
        field: "sellIn",
        operation: "lessThan",
        target: 10
      });
      const effect = new Effect({
        field: "price",
        operation: "-",
        operator: 1
      });
      const newInsurance = {
        name: "test",
        price: 100,
        sellIn: 10,
        rule: [rule],
        effect: [effect]
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
              operation: "lessThan",
              target: 10
            }
          ],
          effect: [
            {
              field: "price",
              operation: "-",
              operator: 1
            }
          ]
        }
      ]);
    });
  });
});
