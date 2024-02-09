import { Article } from "./article";
import { DemandeFournitureDTO } from "./DemandeFournitureDTO";
import { MAgasin } from "./magasin";

export interface ILigneDemandeFournistureDTO {
    id?: number | null,
    quantiteDemande ?: string | null,
     quantiteLivre ?: string | null,
     article ?: Article | null;
     magasin ?: MAgasin | null;
    demandeFourniture ?: DemandeFournitureDTO | null;
    quantiteDisponible?: number | null,
    createdAt ?:any | null
    
  
}
export class LigneDemandeFournistureDTO  implements ILigneDemandeFournistureDTO{
    constructor(
       public quantiteDemande ?: string | null,
       public quantiteLivre ?: string | null,
       public article ?: Article | null,
       public magasin ?: MAgasin | null,
       public demandeFourniture ?: DemandeFournitureDTO | null,
       public id?: number | null,
       public quantiteDisponible?: number | null,
       public   createdAt ?:any | null
    ){}
}
