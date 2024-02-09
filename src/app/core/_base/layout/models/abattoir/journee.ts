//import internal from "stream";
import { IChevillard } from "./chevillard";
import { IEspece } from "./espece";
import { IJourneeEspece } from "./journee-espece";

export class Journee implements IJournee {
    constructor(
        public id : number,
        public chevillards: IChevillard,
        public dateJournee : Date,
        public journeeEspeces : IJourneeEspece[],
        public nombreT : number,
        public nombreTBattus : number,
        public nombreTNonBattus : number,
    ){

    }
  }

  export interface IJournee{
        id : number,
        chevillards : IChevillard,
        dateJournee : Date,
        journeeEspeces : IJourneeEspece[],
        nombreT : number,
        nombreTBattus : number,
        nombreTNonBattus : number,

  }