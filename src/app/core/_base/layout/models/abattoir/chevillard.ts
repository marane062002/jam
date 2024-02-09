export class Chevillard implements IChevillard {
    id?: number;
    nom?: string;
    prenom?: string;
    dateNaissance?: Date;
    telephone?: string;
    cin?: string;
    adresse?: string;
    constructor(
        id?: number,
        nom?: string,
        prenom?: string,
        dateNaissance?: Date,
        telephone?: string,
        cin?: string,
        adresse?: string,
    ) {

    }
}

export interface IChevillard {
    id?: number,
    nom?: string,
    prenom?: string,
    dateNaissance?: Date,
    telephone?: string,
    cin?: string,
    adresse?: string,
}

