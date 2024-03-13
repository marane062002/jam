export interface ISuiviDelegataire {
    id?: number;
    typeIndicateur?: string;
    nom?: string;
	description?: string;
    dateValeur?: string;
    valeurContractuel?: string;
    valeurConstate?: string;

}

export class SuiviDelegataire implements ISuiviDelegataire {
    id?: number;
    typeIndicateur?: string;
    nom?: string;
	description?: string;
    dateValeur?: string;
    valeurContractuel?: string;
    valeurConstate?: string;
}
