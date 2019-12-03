import { Insurance } from "../../entities/Insurance";

describe("Insurance Data-Access-Object test", () => {
  describe("Get all insurance items", () => {
    it("Should return an array of items", () => {
      const insuranceDAO = new insuranceDao();
      const result: Insurance[] = insuranceDAO.get();
      if (result) {
        return result;
      } else {
        throw new Error("Error al obtener la lista de seguros para vender");
      }
    });
  });
});
