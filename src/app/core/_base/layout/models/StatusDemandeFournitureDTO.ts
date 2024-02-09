export interface IStatusDemandeFournitureDTO {
    id ?: number | null;
    libelle ?: string | null;
    code ?: string | null;
  
}
export class StatusDemandeFournitureDTO  implements IStatusDemandeFournitureDTO{
    constructor(
       public  id ?: number | null , 
       public libelle ?: string | null,
       public code ?: string | null,
     
    ){}
}
