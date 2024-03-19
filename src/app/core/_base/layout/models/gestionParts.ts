import { Pesee } from "./pesee";

export class GestionParts implements IGestionParts {
	id?: number
	partMontant?: number;
	
	partCommune?: number;
	partMondataire?: number;
	
    constructor(
		id: number,
	partMontant: number,
	
	partCommune: number,
	partMondataire: number
        ) {


}}

export interface IGestionParts{
    id?: number
	partMontant?: number;
	
	partCommune?: number;
	partMondataire?: number;
}
