import { Journaux } from "./journaux";

export class AO {

		id?: number;
		modePassation?: string;
		seuilMinimal?: number;
		caution?: number;
		dateOuverturePlis?: string;
		serviceGestionnaire?: string;
		division?: string;
		descriptif?: string;
		budgetEstimatif?: number;
		objet?: string;
		numAo?: string;
		listJournaux?: Journaux[];
}
