import { CommissionCA } from "./commission-c-a";
import { PersonneExterneCA } from "./personne-externe-c-a";
export class ParticipantExterneCommissionCA {
	id?: number;

	commissionCA?: CommissionCA;

	personneExterneCA?: PersonneExterneCA;

	present?: boolean;

	justif?: string;
}
