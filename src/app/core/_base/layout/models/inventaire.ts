import { Article } from "./article";
import { MAgasin } from "./magasin";

export class Inventaire {
    id:number
   article:Article;
   magasin:MAgasin;
   obsevations:string;
  quantitePh:number;
  quaniteTh:number;
  ecart:number;
}
