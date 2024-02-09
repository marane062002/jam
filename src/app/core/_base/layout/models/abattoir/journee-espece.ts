import { IEspece } from "./espece";
import { IJournee } from "./journee";

export class JourneeEspece implements IJourneeEspece {
    id?: number;
    espece?: IEspece;
    journee?: IJournee;
    nombreBattu?: number;
    nombreNonBattu?: number;
    nombreBetes?: number;
    nombreNonAbattu?: number;
    nombreAbattu?: number;
    constructor(
        id?: number,
        espece?: IEspece,
        journee?: IJournee,
        nombreBattu?: number,
        nombreNonBattu?: number,
        nombreBetes?: number,
        nombreNonAbattu?: number,
        nombreAbattu?: number,
    ) {

    }
}

export interface IJourneeEspece {
    id?: number,
    espece?: IEspece,
    journee?: IJournee,
    nombreBattu?: number,
    nombreNonBattu?: number,
    nombreBetes?: number,
    nombreNonAbattu?: number,
    nombreAbattu?: number,
}

