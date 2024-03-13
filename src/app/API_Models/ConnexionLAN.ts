import {Connexion} from "./Connexion";

export class ConnexionLAN{
	idConnexionLAN!: number;
	consommation!:    number;
	type_abonnement!: string;
	list_connexions!: Connexion[];
	selectedConnexionIds!: number[];
}
