import { Pesee } from "./pesee";

export class Vehicule implements IVehicule {
	id?: number
	refTransport?: number;
	numVehicule?: String;
	tarra?: number;
	numCnie?: string;
    numCnies?: string[];
    numPermi?: string;
    numPermis?: string[];
	numCarteGrise?: string;
    genre?: String
    nomConducteur?: String
    tel?: String
    message?: String
	numVehiculeNumbers: string;
	numVehiculeAlphabet: string;
	numVehiculeTwoNumbers: string;
    constructor(
		id?: number,
        refTransport?: number,
        numVehicule?: String,
        numCarteGrise?: String,
        numCnie?: String,
        numCnies?: string[],
        numPermi?: string,
        numPermis?: string[],
        tarra?: number,
        genre?: String,
        nomConducteur?: String,
        tel?: String,
        message?: String,
        ) {


}}

export interface IVehicule{
    id?: number
	refTransport?: number
    numVehicule?: String
    numCarteGrise?: String
    numCnie?: String
    numCnies?: string[];
    numPermi?: string;
    numPermis?: string[];
    tarra?: number
    genre?: String
    nomConducteur?: String
    tel?: String
    message?: String
}
