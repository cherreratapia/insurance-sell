import { Insurance } from "../../entities";

export interface IInsuranceDao {
  insurance: Insurance[];
  get: () => Insurance[];
}

export class InsuranceDao implements IInsuranceDao {
  insurance: Insurance[];
  constructor() {
    this.insurance = new Array<Insurance>();
  }

  public get(): Insurance[] {
    return this.insurance;
  }
}
