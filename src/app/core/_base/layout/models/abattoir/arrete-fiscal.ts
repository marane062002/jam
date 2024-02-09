import { IEspece } from "./espece";

export class ArreteFiscal implements IArreteFiscal {

    constructor(

        public id : number,
        public codeNature : number,
        public espece : IEspece,
        public libelle : string,
        public tarif : number,
        //public especeId: IEspece[]
    ){

    }
  }

  export interface IArreteFiscal{
     id : number,
     codeNature : number,
     espece : IEspece,
     libelle : string,
     tarif : number,
     //especeId: IEspece[]
  }
