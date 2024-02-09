export interface IGaragiste {
  id?: number;
  nomFr?: string;
  nomAr?: string | null;
  telephone?: string;
  contact?: string | null;
  adresse?: string | null;
  rc?: string | null;
}

export class Garagiste implements IGaragiste {
  constructor(
    public id?: number,
    public nomFr?: string,
    public nomAr?: string | null,
    public telephone?: string,
    public contact?: string | null,
    public adresse?: string | null,
    public rc?: string | null
  ) {}
}

export function getGaragisteIdentifier(
  garagiste: IGaragiste
): number | undefined {
  return garagiste.id;
}


export class GaragisteCriteria { 
  
  nomFr?: string | null;
  nomAr?: string | null;
  telephone?: string | null;
  contact?: string | null;
  adresse?: string | null;
  rc?: string | null;

  public areSet():boolean {
    return this.nomFr != null || this.nomAr != null ||  this.telephone != null || this.contact != null || this.adresse != null || this.rc != null ;
  }

  public clear():void {
    this.nomFr = null;
    this.nomAr = null;
    this.telephone = null;
    this.contact = null;
    this.adresse = null;
    this.rc = null;
  }

}
