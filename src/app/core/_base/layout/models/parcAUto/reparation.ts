
import { StatusReparation } from "./status-reparation";

export interface IReparationDTO {


    id ?: number | null;
    commentaire ?: string | null;
    dateReparation ?: Date | null;
    idFonctionnaire ?: number | null;
    statusReparation ?: StatusReparation | null;
    vehicule  ?: any | null; 
  //  textReject?: string |null
   // isvalidetDirceteur?: boolean |null;
   // textModifier?: string |null
}
export class Reparation  implements IReparationDTO{
    constructor(
       public id ?: number | null,
       public commentaire ?: string | null,
       public  dateReparation ?: Date | null,
       public idFonctionnaire ?: number | null,
       public statusReparation ?: StatusReparation | null,
       public vehicule  ?: any | null,
    ){}


   
}