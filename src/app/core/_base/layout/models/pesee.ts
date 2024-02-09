import { Hangar } from "./Hangar"
import { PeseeProduit } from "./pesee-produit"
import { Utilisateur } from "./utilisateur"
import { IVehicule, Vehicule } from "./vehicule"

export  class Pesee implements IPesee
	{
	id?:number
	numBon?:number
	idCompte?:number
	numGenre?:number
	nomConducteur?:String
	date?:Date
	heure?:String
    poidGlobal?:number
    poidEmballageTotal?:number
    totalPoidNet?:number
    chiffreTransaction?:number
    taxe?:number
    vehicule?:IVehicule
    genre?:String
	restePoid?:number
	penalite:number
    peseeProduits?:PeseeProduit[]
    hangar?:Hangar
	createurUser?:string
    constructor(numBon?:number,
		numGenre?:number,
		idCompte?:number,
		id?:number,
		nomConducteur?:String,
		penalite?:number,
		date?:Date,
		heure?:String,
		poidGlobal?:number,
		poidEmballageTotal?:number,
		totalPoidNet?:number,
		chiffreTransaction?:number,
		taxe?:number,
		vehicule?:IVehicule,
		restePoid?:number,
		peseeProduits?:PeseeProduit[],
		hangar?:Hangar,
		createurUser?:string){

	};
}
export interface IPesee{
	id?:number
	numGenre?:number
	nomConducteur?:String
	penalite?:number
	numBon?:number
    date?:Date
	heure?:String
    poidGlobal?:number
    poidEmballageTotal?:number
    totalPoidNet?:number
    chiffreTransaction?:number
    taxe?:number
    vehicule?:IVehicule
    genre?:String,
	restePoid?:number
    peseeProduits?:PeseeProduit[]
    hangar?:Hangar
	createurUser?:string
}
