export interface IEntiteDTO {
    id ?: number | null;
    libelle ?: string | null;
    code ?: string | null;
}
export class EntiteDTO  implements IEntiteDTO{
    constructor(
       public  id ?: number | null , 
       public libelle ?: string | null,
       public code ?: string | null,
    ){}
}
