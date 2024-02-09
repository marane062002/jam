import { IVehicule } from "./vehicule.model";

export interface IMarque {
  id?: number;
  code?: string;
  name?: string;
  vehicules?: IVehicule[] | null;
}

export class Marque implements IMarque {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public vehicules?: IVehicule[] | null
  ) {}
}

export function getMarqueIdentifier(marque: IMarque): number | undefined {
  return marque.id;
}

export class MarqueCriteria { 
  
  name?: string | null;
  code?: string | null; 

  public areSet():boolean {
    return this.name != null || this.code != null  ;
  }

  public clear():void {
    this.code = null;
    this.name = null;
  }

}
