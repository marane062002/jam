import { ConsultationArchitecturale } from "./consultation-architecturale";

export class Architecte {
	id?: number;
	nom?: string;
	prenom?: string;
	mail?: string;
	adresse?: string;
	montant?: DoubleRange; // a changer par estimation sommaire
	pourcentage?: number;
	profit?: number;
	nt?: DoubleRange;
	nf?: DoubleRange;
	ne?: DoubleRange;
	noteTotale?: DoubleRange;
	consultationArchitecturale?: ConsultationArchitecturale;
}
