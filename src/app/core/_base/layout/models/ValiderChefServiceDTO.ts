import { ArticleWithQteLivreeDTO } from "./ArticleWithQteLivreeDTO";

export interface IValiderChefServiceDTO {
    
  
    idDemandeFourniture ?: number | null;
    articleWithQteLivreeDTOList ?: ArticleWithQteLivreeDTO[] | null;
    textReject?: string | null,
    observation?: string | null,
    idFonctionnaire?:number| null
  
}
export class ValiderChefServiceDTO  implements IValiderChefServiceDTO{
    constructor(
      
       public idDemandeFourniture ?: number | null,
       public  textReject?: string | null,
       public articleWithQteLivreeDTOList ?: ArticleWithQteLivreeDTO[] | null,
       public  observation?: string | null,
      public  idFonctionnaire?:number| null
    ){}
}
