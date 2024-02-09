import { CommissionCA } from "./commission-c-a";
import { RoleCommissionCA } from "./role-commission-c-a";
export class ParticipantInterneCommissionCA {
	id?: number;

	commissionCA?: CommissionCA;

	present?: boolean;

	justif?: string;

	idPersonnel?: number;

	idDivision?: number;

	idService?: number;

	role?: RoleCommissionCA;
}
