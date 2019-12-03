import { Insurance } from "../../entities/Insurance";
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
});
