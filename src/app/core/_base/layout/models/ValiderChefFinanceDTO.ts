
export interface IValiderChefFinanceDTO {
    
  
    idDemandeFourniture ?: number | null;
    idFonctionnaire?:number| null
  
}
export class ValiderChefFinanceDTO  implements IValiderChefFinanceDTO{
    constructor(
      
       public idDemandeFourniture ?: number | null,
       public  idFonctionnaire?:number| null
     
    ){}
}
