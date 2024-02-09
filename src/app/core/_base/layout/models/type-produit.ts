import { CategorieProduit } from "./categorie-produit";

export class TypeProduit {
    numArticleProduit:number
    nomArticleProduit:String
    categorieProduit:CategorieProduit
	id: number;
    constructor(
        numArticleProduit: number,
        nomArticleProduit: String,
        categorieProduit:CategorieProduit,
		id:number

        ) {
			this.id=id
            this.numArticleProduit=numArticleProduit;
            this.nomArticleProduit=nomArticleProduit;
            this.categorieProduit=categorieProduit;


}
}



