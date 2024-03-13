import {StructureDelegataire} from '../../../parametrages-sdl-delegataire/models/structureDelegataire/structureDelegataire.model';
import {StructureSdl} from '../../../parametrages-sdl-delegataire/models/structureSdl/structureSdl.model';

export interface ISdl {
    id?: number;
    nom?: string;
    raisonSocial?: string;
	raisonCom?: string;
	idFiscale?: string;
    ice?: string;
    numCnss?: string;
    adresse?: string;
    tel?: string;
    fax?: string;
    email?: string;
    gerant?: string;
    structure?: string;
    //structure?: StructureSdl;
    capital?: string;

    // private PieceJointeDTO pieceJointeSdl;
    // private Set<SuiviSdlDTO> suiviSdls = new HashSet<>();
    // private Set<TypeIndicSdlDTO> typeIndicataireSdls = new HashSet<>();

}

export class Sdl implements ISdl {
    id?: number;
    nom?: string;
    raisonSocial?: string;
    raisonCom?: string;
	idFiscale?: string;
    ice?: string;
    numCnss?: string;
    adresse?: string;
    tel?: string;
    fax?: string;
    email?: string;
    gerant?: string;
    structure?: string;
    //structure?: StructureSdl;
    capital?: string;
}
