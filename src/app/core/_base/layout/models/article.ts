import { CategorieArticle } from "./categorie-article";
import { Fournisseur } from "./fournisseur";

export class Article {

    id:number;
	active:boolean;
	numeroArticle:string;
	 designation:string;
	 unite:string;
	 quantite:string;
	 prix:string;
	 type :string;
	 sousType :string;
	 libelle:string;
	 reference:string;
	 longueur :number;
	 largeur :number;
	 profondeur :number;
	 poid:number;
	 quantiteStock :number;
	 datePeremption :string;
	 famille:string;
     categorieArticle:CategorieArticle;
	 fournisseur:Fournisseur;
	// tva:number;
	codedisignation:string="";
	 quantiteMin:number;
	 constructor(){
		 this.codedisignation=this.designation+"---"+this.numeroArticle
		 this.fournisseur=new Fournisseur();
	 }
}
