import { ConsultationArchitecturale } from "./consultation-architecturale";
import { TypeCommissionCA } from "./type-commission-c-a";
export class CommissionCA {
	id?: number;

	dateDebut?: Date;

	typeCommissionCA?: TypeCommissionCA;

	consultationArchitecturale?: ConsultationArchitecturale;
}
