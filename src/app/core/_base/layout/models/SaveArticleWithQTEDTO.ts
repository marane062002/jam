import { Article } from "./article";
import { MAgasin } from "./magasin";

export interface ISaveArticleWithQTE {
    
    articleDTO ?: Article | null;
    qteDemandee ?: number | null;
    qteLivree ?: number | null;
    magasin ?: MAgasin | null,
 
  
}
export class SaveArticleWithQTE  implements ISaveArticleWithQTE{
    constructor(
       public articleDTO ?: Article | null,
       public qteDemandee ?: number | null,
       public qteLivree ?: number | null,
       public magasin ?: MAgasin | null,
       public source?: number | null
     
    ){}
}
