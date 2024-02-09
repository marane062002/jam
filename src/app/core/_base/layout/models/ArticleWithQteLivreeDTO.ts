

export interface IArticleWithQteLivreeDTO {
    idArticle ?: number | null,
    qteLivree ?: number | null,
   
    
  
}
export class ArticleWithQteLivreeDTO  implements IArticleWithQteLivreeDTO{
    constructor(
       public idArticle ?: number | null,
       public qteLivree ?: number | null,
       
    ){}
}
