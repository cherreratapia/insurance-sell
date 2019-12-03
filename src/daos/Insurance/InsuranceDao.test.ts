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
});
