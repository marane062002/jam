import { IVehicule } from "./vehicule.model";

export interface ICategorieVehicule {
  id?: number;
  code?: string;
  name?: string;
  vehicules?: IVehicule[] | null;
}

export class CategorieVehicule implements ICategorieVehicule {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public vehicules?: IVehicule[] | null
  ) {}
}

export function getCategorieVehiculeIdentifier(
  categorieVehicule: ICategorieVehicule
): number | undefined {
  return categorieVehicule.id;
}
