import { Emballage } from "./emballage"
import { PeseeProduit } from "./pesee-produit"
import { Produit } from "./produit"
import { TypeProduit } from "./type-produit"

export class HistoriqueProduit implements IHistoriqueProduit {




    constructor(
		public refProduit:number=0,
		public lib:string="",
		public tarif:number=0,
		public description?:string,
		public typeProduit?:TypeProduit,
        public creationDate?:Date,
        public createurUser?:string,
        public produit?:Produit,
		// emballage:Emballage
		// public peseeProduits?:PeseeProduit[]
		)
		{

    }
}
export interface IHistoriqueProduit{
	// id?:number
	refProduit?:number
    lib?:string
    tarif?:number
    description?:string
    typeProduit?:TypeProduit,
     creationDate?:Date,
     createurUser?:string,
     produit?:Produit,
    // emballage:Emballage
	// peseeProduits?:PeseeProduit[]
}
