export interface ISearchFonctionnaireDTO {
    email ?: string | null;
    nom ?: string | null;
}
export class SearchFonctionnaireDTO  implements ISearchFonctionnaireDTO{
    constructor(
       public email ?: string | null,
       public nom ?: string | null,
    ){}
}
