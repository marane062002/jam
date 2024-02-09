import { AO } from "./ao";
import { ConsultationArchitecturale } from "./consultation-architecturale";

export class Journaux {
	id?: number;
	nomAr?: string;
	nomFr?: string;
	adresse?: string;
	date?: Date;
	consultationArchitecturale?: ConsultationArchitecturale;
	ao?: AO;
}
