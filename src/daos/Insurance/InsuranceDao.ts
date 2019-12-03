import { Insurance } from "../../entities";

export interface IInsuranceDao {
  insurance: Insurance[];
  get: () => Insurance[];
  add: (insurance: Insurance) => Insurance[];
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
}
