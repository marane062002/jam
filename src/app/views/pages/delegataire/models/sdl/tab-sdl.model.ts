export interface ISuiviSdl {
    id?: number;
    typeIndicateur?: string;
    nom?: string;
	description?: string;
    dateValeur?: string;
    valeurContractuel?: string;
    valeurConstate?: string;

}

export class SuiviSdl implements ISuiviSdl {
    id?: number;
    typeIndicateur?: string;
    nom?: string;
	description?: string;
    dateValeur?: string;
    valeurContractuel?: string;
    valeurConstate?: string;
}
