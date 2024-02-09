import { IEspece } from "./espece";

export class Facture implements IFacture {
    constructor(
        public balance: number,
        public codeNature: number,
        public dureeSejour: Date,
        public dureeSejourFrigo: Date ,
        public espece: IEspece,
        public libelle: string ,
        public montant: number,
        public montanttotal: number ,
        public nombreTetes: number,
        public nombreTetesEquaraisse: number,
        public poidsNCacher: number,
        public poidsNConsom: number,
        public poidsNNonConsom: number,
        public typeAbattage : string,
    ){

    }
  }

  export interface IFacture{
           balance: number,
           codeNature: number,
           dureeSejour: Date,
           dureeSejourFrigo: Date ,
           espece: IEspece,
           libelle: string ,
           montant: number,
           montanttotal: number ,
           nombreTetes: number,
           nombreTetesEquaraisse: number,
           poidsNCacher: number,
           poidsNConsom: number,
           poidsNNonConsom: number,
           typeAbattage : string,
  }
