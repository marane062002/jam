import { Article } from "./article";
import { DemandeFournitureDTO } from "./DemandeFournitureDTO";
import { MAgasin } from "./magasin";

export class Sortie {
    id:number
    magasin:MAgasin;
    article:Article;
    numeroCommande:string;
    codeAnalytique:string;
    designation:string;
    unite:string;
    quantite:number;
    demandeFourniture: DemandeFournitureDTO
}
