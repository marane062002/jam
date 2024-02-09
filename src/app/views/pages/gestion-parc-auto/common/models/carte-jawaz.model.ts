export interface ICarteJawaz {
  id?: number;
  reference?: string;
  soldedepart?: number;
  soldeactuel?: number;
}

export class CarteJawaz implements ICarteJawaz {
  constructor(
    public id?: number,
    public reference?: string,
    public soldedepart?: number,
    public soldeactuel?: number
  ) {}
}

export function getCarteJawazIdentifier(
  carteJawaz: ICarteJawaz
): number | undefined {
  return carteJawaz.id;
}


export class CarteJawazCriteria { 
  
  reference?:   string | null;
  soldedepart?: number | null;
  soldeactuel?: number | null;

  public areSet():boolean {
    return this.reference != null || this.soldedepart != null ||  this.soldeactuel != null;
  }

  public clear():void {
    this.reference = null;
    this.soldedepart = null;
    this.soldeactuel = null;
  }

}