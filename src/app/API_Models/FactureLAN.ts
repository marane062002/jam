export class FactureLAN {
	idFactureLAN!:    number;
	montant!:          number;
	statut_payement!:  Facture_PaiementStatut;
	date_facturation!: Date;
	mode_payement!:    string;

	formattedDate: string;
	originalFactureFile!: Blob;

}
