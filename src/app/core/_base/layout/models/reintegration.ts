import { Article } from "./article";
import { MAgasin } from "./magasin";

export class Reintegration {
    id:number;
    Ref_BS:string;
	article:Article;
	magasin:MAgasin;
	 codeAnalytique:String;
	designation:String;
	quantite:number;
    date:Date
    etat:string;
}
