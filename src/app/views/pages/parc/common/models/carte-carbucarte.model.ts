import dayjs from "dayjs/esm";

export interface ICarteCarbucarte {
  id?: number;
  reference?: string;
  montant?: number;
  dateAcquisition?: dayjs.Dayjs;
  pin?: string | null;
  soldeactuel?: number;
  annee?: number;
}

export class CarteCarbucarte implements ICarteCarbucarte {
  constructor(
    public id?: number,
    public reference?: string,
    public montant?: number,
    public dateAcquisition?: dayjs.Dayjs,
    public pin?: string | null,
    public soldeactuel?: number,
    public annee?: number
  ) {}
}

export function getCarteCarbucarteIdentifier(
  carteCarbucarte: ICarteCarbucarte
): number | undefined {
  return carteCarbucarte.id;
}


export class CarteCarbucarteCriteria { 
  
  reference?: string | null;
  montant?: number | null;
  dateAcquisition?: dayjs.Dayjs | null;
  pin?: string | null;
  soldeactuel?: number | null;
  annee?: number | null;

  public areSet():boolean {
    return this.reference != null || this.montant != null ||  this.dateAcquisition != null || this.pin != null || this.soldeactuel != null || this.annee != null ;
  }

  public clear():void {
    this.reference = null;
    this.montant = null;
    this.dateAcquisition = null;
    this.pin = null;
    this.soldeactuel = null;
    this.annee = null;
  }

}