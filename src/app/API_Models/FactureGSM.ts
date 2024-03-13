export class FactureGSM {
	idFactureGSM!:    number;
	montant!:          number;
	statut_payement!:  Facture_PaiementStatut;
	date_facturation!: Date;
	mode_payement!:    string;

	formattedDate: string;
	originalFactureFile!: Blob;
}

/*enum Facture_PaiementStatut {
	PAYEE = 'payée',
	NON_PAYEE = "non payée",
}*/
