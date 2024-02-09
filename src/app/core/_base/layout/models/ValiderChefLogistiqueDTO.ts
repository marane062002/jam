
export interface IValiderChefLogistiqueDTO {
    
  
    idDemandeFourniture ?: number | null;
    observation ?: string | null;
    idFonctionnaire?:number| null
}
export class ValiderChefLogistiqueDTO  implements IValiderChefLogistiqueDTO{
    constructor(
      
       public idDemandeFourniture ?: number | null,
       public observation ?: string | null,
       public  idFonctionnaire?:number| null
     
    ){}
}
