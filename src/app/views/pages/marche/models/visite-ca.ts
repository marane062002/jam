import { ConsultationArchitecturale } from "./consultation-architecturale";
export class VisiteCa {
	id?: number;
	dateVisite?: Date;
	dateOuvertureDesPlis?: Date;
	lieuVisite?: string;
	responsable?: any;
	division?: number;
	service?: number;
	note?: string;
	consultationArchitecturale?: ConsultationArchitecturale;
}
