import {StructureDelegataire} from '../../../parametrages-sdl-delegataire/models/structureDelegataire/structureDelegataire.model';

export interface IDelegataire {
    id?: number;
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
    //structure?: StructureDelegataire;
    capital?: string;
    
    // private PieceJointeDTO pieceJointeDelegataire;
    // private Set<SuiviDelegataireDTO> suiviDelegataires = new HashSet<>();
    // private Set<TypeIndicDelegataireDTO> typeIndicataireDelegataires = new HashSet<>();

}

export class Delegataire implements IDelegataire {
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
    //structure?: StructureDelegataire;
    capital?: string;
}
