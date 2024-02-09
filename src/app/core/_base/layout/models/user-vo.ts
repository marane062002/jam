import {ProfileVO} from "./profile-vo";

export class UserVO {
    id : number ;
    nom : string;
    prenom : string;
    mail  : string;
    pwd : string;
    valid : boolean;
    cin :string;
    adress :string;
    telephone :string;
    dateActivation : string;
    dateDesactivation :string;
    identifiant : string;
    raisonSociale : string
    libelleStructure : string
    codePostale : string;
    ville :string;
    pays : string
    profile :ProfileVO;


}
