import { Article } from "./article";
import { MAgasin } from "./magasin";

export class ArticleStock {

  id:number;
  id_item:number;
  quantiteStock:number;
  rayonnage:String;
  quantite:number;
  article:Article;
  magasin:MAgasin;
  obsevations:string;
  quantitePh:number;
  quaniteTh:number;
  ecart:number;
  quantiteMin:number;
}
