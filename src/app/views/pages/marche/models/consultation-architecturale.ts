import { Architecte } from "./architecte";
import { Journaux } from "./journaux";

export class ConsultationArchitecturale {
	id?: number;
	numCA?: string;
	objetFR?: string;
	objetAR?: string;
	budget?: DoubleRange;
	type?: string;
	date?: Date;
	loi?: number;
	noteDG?: string;
	noteSG?: string;
	noteTresorerie?: string;
	isValideDg?: boolean;
	isValideTresorerie?: boolean;
	isValideSG?: boolean;
	listArchitectes?: Architecte[];
	listJournaux?: Journaux[];
}
