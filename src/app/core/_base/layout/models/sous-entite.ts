
export interface ISousEntite {
    id ?: number | null;
    libelle ?: string | null;
    codeAnalytique ?: string | null;
    sigle ?: string | null;

  
}
export class SousEntite  implements ISousEntite{
    constructor(
       public  id ?: number | null , 
       public libelle ?: string | null,
       public codeAnalytique ?: string | null,
       public sigle ?: string | null,
    ){}
}
