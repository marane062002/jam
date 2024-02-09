export interface IUpdateFonctionnaireDTO {
    id ?: number | null;
    nom ?: string | null;
    prenom ?: string | null;
    phone ?: string | null;
    fonction ?: string | null;
    numeroPermis ?: string | null;
    idRole ?: number | null;
    idEntite ?: number | null;
}
export class UpdateFonctionnaireDTO  implements IUpdateFonctionnaireDTO{
    constructor(
       public  id ?: number | null , 
       public nom ?: string | null,
       public prenom ?: string | null,
       public phone ?: string | null,
       public fonction ?: string | null,
       public numeroPermis ?: string | null,
       public idRole ?: number | null,
       public idEntite ?: number | null,
    ){}
}
