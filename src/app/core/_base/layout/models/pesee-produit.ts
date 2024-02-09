import { timeStamp } from "console"
import { Emballage } from "./emballage"
import { Pesee } from "./pesee"
import { Produit } from "./produit"

export class PeseeProduit {
	id?:number
	isEdit?:boolean
    numBon?:number
    // refProduit:number
    poidNetProduit?:number
    quantiteProduit?:number
    totalProduit?:number
    poidEmballageProduit?:number
    // pesee:Pesee
    produit?:Produit
	emballage?:Emballage

    constructor(numBon,poidNetProduit,quantiteProduit,totalProduit,poidEmballageProduit,produit,emballage,isEdit,id){
		this.id=id
		this.isEdit=isEdit
        this.numBon=numBon
        // this.refProduit=refProduit
        this.poidNetProduit=poidNetProduit
        this.quantiteProduit=quantiteProduit
        this.totalProduit=totalProduit
        this.poidEmballageProduit=poidEmballageProduit
        // this.pesee=pesee
        this.produit=produit
		this.emballage=emballage
    }
}
