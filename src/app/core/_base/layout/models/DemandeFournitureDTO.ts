import { StatusDemandeFournitureDTO } from "./StatusDemandeFournitureDTO";

export interface IDemandeFournitureDTO {
    id ?: number | null;
    numeroDemande ?: string | null;
    createdAt ?: Date | null;
    codeAnalytique ?: string | null;
    observation ?: string | null;
    idFonctionnaire ?: number | null;
    statusDemandeFourniture ?: StatusDemandeFournitureDTO | null;
    source?: number | null;
    code?: string | null;
    textReject?: string |null
    isvalidetDirceteur?: boolean |null;
    textModifier?: string |null
}
export class DemandeFournitureDTO  implements IDemandeFournitureDTO{
    constructor(
       public  id ?: number | null , 
       public numeroDemande ?: string | null,
       public createdAt ?: Date | null,
       public codeAnalytique ?: string | null,
       public observation ?: string | null,
       public idFonctionnaire ?: number | null,
       public statusDemandeFourniture ?: StatusDemandeFournitureDTO | null,
       public source?: number | null,
       public  code?: string | null,
       public textReject?: string |null,
       public isvalidetDirceteur?: boolean |null,
       public textModifier?: string |null
    ){}


   
}
