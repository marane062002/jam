
export interface IStatusReparationDTO {
    id ?: number | null;
    libelle ?: string | null;
    code ?: string | null;
  
}
export class StatusReparation  implements IStatusReparationDTO{
    constructor(
       public  id ?: number | null , 
       public libelle ?: string | null,
       public code ?: string | null,
     
    ){}

    }