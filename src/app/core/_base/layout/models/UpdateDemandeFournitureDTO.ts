import { DemandeFournitureDTO } from "./DemandeFournitureDTO";
import { SaveArticleWithQTE } from "./SaveArticleWithQTEDTO";

export interface IUpdateDemandeFournitureDTO {
    
    demandeFournitureDTO ?: DemandeFournitureDTO | null;
    saveArticleWithQTE ?: SaveArticleWithQTE[] | null;
  
  
}
export class UpdateDemandeFournitureDTO  implements IUpdateDemandeFournitureDTO{
    constructor(
       public demandeFournitureDTO ?: DemandeFournitureDTO | null,
       public saveArticleWithQTE ?: SaveArticleWithQTE[] | null,
     
    ){}
}
