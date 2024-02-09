import { IVehicule } from "./vehicule.model";

export interface IAccessoireVehicule {
  id?: number;
  code?: string;
  name?: string;
}

export class AccessoireVehicule implements IAccessoireVehicule {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
  ) {}
}

export function getAccessoireVehiculeIdentifier(
  accessoireVehicule: IAccessoireVehicule
): number | undefined {
  return accessoireVehicule.id;
}
