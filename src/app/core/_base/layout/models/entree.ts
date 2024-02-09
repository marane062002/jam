import { Article } from "./article";
import { Fournisseur } from "./fournisseur";
import { MAgasin } from "./magasin";
import { Reference } from "./reference";

export class Entree {
  id            :Number;
  magasin       :MAgasin;
  numMarche     :string;
  codeAnalytique:string;
  reference:Reference;
  fournisseur:Fournisseur;
 /*  designation:string;
    unite:string;
    quantite:string;
     rayonnage:string;
     date:string;
    prixAchat:string;
     CUMP:string;
     codeAnalytique:string; */
}
