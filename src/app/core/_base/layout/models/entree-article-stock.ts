import { Article } from "./article";
import { Entree } from "./entree";

export class EntreeArticleStock {
  quantite:number;
  rayonnage:string;
  prixAchat:number;
  tva:number;
  article:Article;
  entree:Entree;
  constructor(){
    this.article=new Article();
    this.entree=new Entree();
  }
}
