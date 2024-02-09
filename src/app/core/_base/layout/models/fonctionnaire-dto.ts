import { EntiteDTO } from "./entite-dto";
import { RoleDTO } from "./role-dto";
import { SousEntite } from "./sous-entite";

export interface IFonctionnaireDTO {
    id ?: number | null;
    nom ?: string | null;
    prenom ?: string | null;
    email ?: string | null;
    phone ?: string | null;
    fonction ?: string | null;
    numeroPermis ?: string | null;
    active ?: boolean | null;
    entite ?: EntiteDTO | null;
    role ?: RoleDTO | null;
    codeAnalytique?: string | null;
    updatedAt?: Date | null;
    sousEntite?: SousEntite | null;
}
export class FonctionnaireDTO  implements IFonctionnaireDTO{
    constructor(
       public  id ?: number | null , 
       public nom ?: string | null,
       public prenom ?: string | null,
       public email ?: string | null,
       public phone ?: string | null,
       public fonction ?: string | null,
       public numeroPermis ?: string | null,
       public active ?: boolean | null,
       public entite ?: EntiteDTO | null,
       public role ?: RoleDTO | null,
       public codeAnalytique?: string | null,
       public updatedAt?: Date | null,
      public  sousEntite?: SousEntite | null
    ){}
}
