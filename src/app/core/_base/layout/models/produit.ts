import { Emballage } from "./emballage"
import { PeseeProduit } from "./pesee-produit"
import { TypeProduit } from "./type-produit"

export class Produit implements IProduit {




    constructor(
		public refProduit:number=0,
		public lib:string="",
		public tarif:number=0,
		public description?:string,
		public typeProduit?:TypeProduit,
		// emballage:Emballage
		// public peseeProduits?:PeseeProduit[]
		)
		{

    }
}
export interface IProduit{
	// id?:number
	refProduit?:number
    lib?:string
    tarif?:number
    description?:string
    typeProduit?:TypeProduit
    // emballage:Emballage
	// peseeProduits?:PeseeProduit[]
}
