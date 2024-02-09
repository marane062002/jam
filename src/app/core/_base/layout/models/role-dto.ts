export interface IRoleDTO {
    id ?: number | null;
    libelle ?: string | null;
    libelleCoresp ?: string | null;
}
export class RoleDTO  implements IRoleDTO{
    constructor(
       public  id ?: number | null , 
       public libelle ?: string | null,
       public libelleCoresp ?: string | null,
    ){}
}
